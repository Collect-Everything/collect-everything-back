import { ValueObject, ValueObjectValidationError } from '@ce/shared-core';
import { z } from 'zod';

export const AdvantagePropsSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().nullish()
});

export type AdvantageProps = z.infer<typeof AdvantagePropsSchema>;

export interface AdvantageData {
  title: string;
  description: string;
  icon?: string | null;
}

export class Advantage extends ValueObject<AdvantageProps> {
  constructor(public readonly props: AdvantageProps) {
    super(props);
    this.validate();
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  static fromData(data: AdvantageData): Advantage {
    return new Advantage(data);
  }

  get data(): AdvantageData {
    return this.props;
  }

  private validate() {
    const result = AdvantagePropsSchema.safeParse(this.props);

    if (!result.success) {
      throw new ValueObjectValidationError(
        this.constructor.name,
        result.error.errors,
        result.error.message
      );
    }
  }
}
