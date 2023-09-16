import ss from './styles.module.scss';

type Props = {
  margin?: string;
};

export const Divider = (props: Props) => (
  <div className={ss.container}>
    <div style={{ margin: props.margin }} className={ss.divider}></div>
  </div>
);
