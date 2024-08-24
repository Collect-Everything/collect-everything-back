import { ValueObject, ValueObjectValidationError } from '@ce/shared-core';
import { z } from 'zod';

export const AdvantagePropsSchema = z.object({
  title: z.string(),
  description: z.string()
});

export type AdvantageProps = z.infer<typeof AdvantagePropsSchema>;

export interface AdvantageData {
  title: string;
  description: string;
}

export class Advantage extends ValueObject<AdvantageProps> {
  constructor(public readonly props: AdvantageProps) {
    super(props);
    this.validate();
  }

  static fromData(data: AdvantageData): Advantage {
    return new Advantage(data);
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
