import { memo } from 'react';
import SystemMessage from './SystemMessage';

const MemoizedSystemMessage = memo(function MemoizedSystemMessage({
  text,
  speed,
}: {
  text: string;
  speed: number;
}) {
  return <SystemMessage text={text} speed={speed} delay={0} prefix />;
});

export default MemoizedSystemMessage;
