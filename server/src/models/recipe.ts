import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

// Recipe attributes
interface RecipeAttributes {
  id: number;
  title: string;
  image_url: string;
  source_url: string;
  summary: string;
  instructions: string;
  ingredients: object[];
  created_at?: Date;
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'created_at'> {}

// Sequelize Model
class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: number;
  public title!: string;
  public image_url!: string;
  public source_url!: string;
  public summary!: string;
  public instructions!: string;
  public ingredients!: object[];
  public created_at!: Date;
}

Recipe.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: DataTypes.STRING,
    source_url: DataTypes.STRING,
    summary: DataTypes.TEXT,
    instructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'spoon_eats',
    timestamps: false,
  }
);

export default Recipe;
