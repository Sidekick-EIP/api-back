import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { UserInfoService } from '../user_infos/user_infos.service';

@Injectable()
export class MealRecoService {
  private readonly client: OpenAIApi;

  constructor(private configService: ConfigService, private userInfosService: UserInfoService) {
    const configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    this.client = new OpenAIApi(configuration);
  }

  async mealReco(user_needs: string, goal: string, email: string): Promise<string> {
    const user = await this.userInfosService.find(email).catch(() => { });

    goal = user ? user.goal : goal;
    if (!goal) throw new Error("Goal is required");

    const formatted_goal = goal == "WEIGHT_GAIN" ? "gain weight" : "lose weight or get back in shape"

    try {
      let prompt = [];
      prompt = [{
        role: "user", content: `Act as a nutritionist, and be concise. 
      Your client needs wants a meal recommendation, and here is his request: ${user_needs}\n
      His goal is to : ${formatted_goal}\n
      Meal recommendation:`
      }];

      prompt.push({ role: "assistant", content: "" })
      const res = await this.client.createChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages: prompt,
          temperature: 0.2,
          max_tokens: 300,
        }
      );
      return res.data.choices[0].message.content;
    } catch (e) {
      return "Sorry, I didn't understand your request."
    }
  }
}

