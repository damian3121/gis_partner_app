import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export enum AlertType {
  SUCCES,
  ERROR
}

interface Props {
  content: string;
  type: AlertType;
}

export function Notyfication(props: Props) {
  const notyf = new Notyf();

  switch (props.type) {
    case AlertType.SUCCES:
      return notyf.success(props.content);
    case AlertType.ERROR:
      return notyf.error(props.content);
    default:
      return null;
  }
}