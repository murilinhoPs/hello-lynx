import './index.css';
import { useMemo } from "@lynx-js/react";

export function App() {
  return (
    <view style={{ marginTop: '20%' }}>
      <text
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          alignSelf: 'center',
          color: '#fff',
        }}
      >
        Hello World!
      </text>
    </view>
  );
}
