import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OpenffService {
  constructor(private prismaService: PrismaService) {
  }

  async findAll(request: string) {
    let data = [];
    try {
      const res = fetch(request, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await res.then((response) => {
        return response.json();
      });
    } catch (error) {
      const products = await this.prismaService.openFoodFacts.findMany({});
      const data = products.map((product) => ({
        product_name: product.product_name ?? "Und3f1nd",
        brands: product.brands ?? "Und3f1ndBrand",
        nutriments: {
          energy_kcal_100g: product.energy_kcal_100g ?? -1,
          proteins_100g: product.proteins_100g ?? -1.0,
          carbohydrates_100g: product.carbohydrates_100g ?? -1.0,
          fat_100g: product.fat_100g ?? -1.0,
        },
        image_front_url: product.image_front_url ??
          "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=",
        nutrition_grades: product.nutriscore ?? "Und3f1ndScore",
      }));
      return data;
    }
    return data;
  }
}
