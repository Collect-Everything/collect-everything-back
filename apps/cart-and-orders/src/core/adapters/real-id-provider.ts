import { v4 as uuidv4 } from 'uuid';

export class RealIDProvider {
  generate() {
    return uuidv4();
  }
}
