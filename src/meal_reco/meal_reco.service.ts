import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class MealRecoService {
  private readonly client: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    this.client = new OpenAIApi(configuration);
  }

  async mealReco(user_needs: string, goal: string): Promise<string> {
    try {
      let prompt = [];
      prompt = [{ role: "user", content: `Be concise. User needs: ${user_needs}\nGoal: ${goal}\nMeal recommendation:` }];
      prompt.push({ role: "assistant", content: "" })
      const res = await this.client.createChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages: prompt,
          temperature: 0.3,
          max_tokens: 200,
        }
      );
      return res.data.choices[0].message.content;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

