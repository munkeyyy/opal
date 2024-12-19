import { Input } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
// import { useReactMediaRecorder } from "react-media-recorder";
// import { desktopCapturer } from "electron";
const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const SearchBar = () => {
  // const { status, startRecording, stopRecording, mediaBlobUrl } =
  // useReactMediaRecorder({ video: true });
    const handleRecord = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: true
            });

            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, {
                    type: 'video/webm'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'screen-recording.webm';
                a.click();
                URL.revokeObjectURL(url);
            };

            mediaRecorder.start();
            
            // Stop recording after user stops sharing screen
            stream.getVideoTracks()[0].onended = () => {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
            };

        } catch (err) {
            console.error("Error recording screen:", err);
            message.error("Failed to start screen recording");
        }
    }

  return (
    <div className=" py-4 px-24 mx-auto flex items-start justify-between gap-4 w-full">
      <div className="w-full flex items-center gap-1 justify-start border border-[rgb(77,76,76)] rounded-full">
        <svg
          className="ml-5"
          xmlns="http://www.w3.org/2000/svg"
          width="1.3rem"
          height="1.3rem"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="rgb(175,175,175)"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke-dasharray="40"
              stroke-dashoffset="40"
              d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.5s"
                values="40;0"
              />
            </path>
            <path
              stroke-dasharray="12"
              stroke-dashoffset="12"
              d="M10.5 13.5l-7.5 7.5"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.5s"
                dur="0.2s"
                values="12;0"
              />
            </path>
          </g>
        </svg>
        <Input
          type="search"
          placeholder="Search"
          className="w-[50%]  py-4 px-2 transition-all duration-200 bg-transparent border-none hover:bg-transparent hover:border-[white] text-white focus-within:bg-transparent focus-within:border-[white] placeholder:text-[rgb(175,175,175)]"
        />
      </div>
      <div className="flex items-center gap-4">
        <Upload {...props}>
          <Button
            className="font-semibold rounded-lg p-4 mt-3"
            icon={<UploadOutlined />}
          >
            Click to Upload
          </Button>
        </Upload>
        <div>

        <button onClick={handleRecord} className="text-black bg-white px-4 py-1.5 font-normal rounded-lg flex items-center gap-2 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 15.75v-7.5a2 2 0 0 1 2-2h8.5a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m17.168-8.759l-4 3.563a.5.5 0 0 0-.168.373v1.778a.5.5 0 0 0 .168.373l4 3.563a.5.5 0 0 0 .832-.374V7.365a.5.5 0 0 0-.832-.374"
            />
          </svg>
          Record
        </button>
        {/* <video src={mediaBlobUrl} controls autoPlay loop></video>
        <p>{status}</p> */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
