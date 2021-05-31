import { Color } from '../utility/enums/color.enum ';
import { Size } from '../utility/enums/size.enum';

interface IAlert {
  visible: boolean;
  color: Color;
  message: string;
  size?: Size;
  direction?: string;
}

class Alert implements IAlert {
  constructor(
    public visible: boolean,
    public color: Color,
    public message: string,
    public size: Size = Size.sm,
    public direction: string
  ) {}
}

// export
export { IAlert, Alert };
