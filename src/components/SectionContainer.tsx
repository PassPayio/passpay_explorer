import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

const SectionContainer = (props: SectionProps) => {
  return <div className="w-full antialiased">{props.children}</div>;
};

export default SectionContainer;
