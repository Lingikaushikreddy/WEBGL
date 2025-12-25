import { KeyboardControls } from '@react-three/drei';
import { Experience } from './Experience';
import { Overlay } from './UI/Overlay';

function App() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        { name: 'action', keys: ['Space'] },
      ]}
    >
      <Experience />
      <Overlay />
    </KeyboardControls>
  );
}

export default App;
