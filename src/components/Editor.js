// import React, { useEffect, useRef } from 'react';
// import Codemirror from 'codemirror'; // Changed from 'codemirror' to 'CodeMirror'
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/mode/javascript/javascript';
// import ACTIONS from '../Actions';

// const Editor = ({ socketRef, roomId, onCodeChange }) => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     async function init() {
//       editorRef.current = Codemirror.fromTextArea(
//         document.getElementById('realtimeEditor'),
//         {
//           mode: {name: 'javascript'},
//           theme: 'dracula',
//           lineNumbers: true,
//         }
//       );

//       editorRef.current.on('change', (instance, changes) => {
//         // console.log('changes', changes);
//         const { origin } = changes;
//         const code = instance.getValue();
//         onCodeChange(code);

//         if (origin !== 'setValue') {
          
//           socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//             roomId,
//             code,
//           });
//         }
//       });
//     }
//     init();

//   }, []);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
//         if (code !== null) {
//           editorRef.current.setValue(code);
//         }
//       });
//     }

     
  
//   }, [socketRef.current]);

//   return <textarea id="realtimeEditor"></textarea>;
// };

// export default Editor;
import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror'; // Changed from 'codemirror' to 'CodeMirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: {name: 'javascript'},
          theme: 'dracula',
          lineNumbers: true,
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        // console.log('changes', changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== 'setValue') {
          
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();

  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

     
  
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;

