import { CreateNameInput } from './createName.input';

//* In a graphql implementation, this would be where I
// use the @InputType decorator to create an input type
// for updating names. each subclass would be an @Field()

export class UpdateNameInput implements Partial<CreateNameInput> {
  public nameId: number;

  public name?: string;
}
