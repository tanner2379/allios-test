//* In a graphql implementation, this would be where I
// use the @InputType decorator to create an input type
// for creating new names. each subclass would be an @Field()

export class CreateNameInput {
  public name: string;
}
