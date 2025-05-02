import React, { useEffect, useState, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { postMeetingId, updateInterStatusToCompleted } from '../../utils/apiFunctions';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function InterviewClient() {
  const roomID = randomID(5);
  const [submitted, setSubmitted] = useState(false);
  const { interviewId } = useParams();
  const meetingRef = useRef(null); // Create a ref to attach the meeting container

  // Use useEffect to handle side effects
  useEffect(() => {
    if (!submitted) {
      postMeetingId(interviewId, roomID); // Call the function to post the meetingId
      setSubmitted(true);
    }
  }, [submitted, interviewId, roomID]);

  // Function to handle meeting setup
  const myMeeting = async () => {
    const appID = 287878519;
    const serverSecret = '6d9735ab65ed96f06bd06d65eda14cb4';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    // Start the call
    zp.joinRoom({
      container: meetingRef.current, // Attach to the ref's current DOM element
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // Use GroupCall scenario
      },
    });
  };

  // Use useEffect to initialize the meeting once the component mounts
  useEffect(() => {
    myMeeting(); // Call the meeting setup function
    const handleTabClose = (event) => {
      event.preventDefault(); // For some browsers to show a confirmation dialog
      // Call your custom logic here
      updateInterStatusToCompleted(interviewId)
    };
    // Attach the beforeunload event listener
    window.addEventListener('beforeunload', handleTabClose);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };

  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <div
      className="myCallContainer"
      ref={meetingRef} // Use the ref for the container
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
