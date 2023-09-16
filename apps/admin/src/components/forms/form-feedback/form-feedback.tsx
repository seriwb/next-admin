import ss from './form-feedback.module.scss';

type Props = {
  children: React.ReactNode;
};

export const FormFeedback = (props: Props) => {
  return props.children ? <div className={ss.feedback}>{props.children}</div> : <></>;
};
