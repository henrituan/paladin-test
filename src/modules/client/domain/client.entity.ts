interface ClientProps {
  id: number;
  firstName: string;
  lastName: string;
}

export class Client {
  private props: ClientProps;

  constructor(props: ClientProps) {
    this.props = props;
  }

  public getId(): number {
    return this.props.id;
  }

  public getFirstName(): string {
    return this.props.firstName;
  }

  public getLastName(): string {
    return this.props.lastName;
  }
}
