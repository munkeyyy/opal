import { message, Modal } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery";
// import { useNavigate, useParams } from "react-router-dom";

const Folder = ({ currentFolder }) => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    contentIndex: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const folders = JSON.parse(localStorage.getItem("folders"));
    const singleFolder = folders.find((f) => f.id === parseInt(id));
    setFolder(singleFolder);
  }, [id]);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ visible: false, x: 0, y: 0, contentIndex: null });
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  console.log("Folder contents:", folder?.contents);

  const renderContent = (content) => {
    if (!content || !content.url) return null;

    console.log("Content being rendered:", content);

    try {
      return content.type.startsWith("image/") ? (
        <img
          src={content.url}
          alt={content.name || "Uploaded file"}
          className="h-full w-full object-cover"
         
        />
      ) : (
        <video className="h-full w-full object-cover" controls={false}>
          <source src={content.url} />
        </video>
      );
    } catch (error) {
      console.error("Error rendering content:", error);
      return <div>Error displaying file</div>;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFile({
          file,
          url: reader.result,
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      contentIndex: index,
    });
  };

  const startRenaming = (index) => {
    setEditingIndex(index);
    setContextMenu({ visible: false, x: 0, y: 0, contentIndex: null });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleRename = (index, newName) => {
    const folders = JSON.parse(localStorage.getItem("folders"));
    const updatedFolders = folders.map((f) => {
      if (f.id === parseInt(id)) {
        const updatedContents = [...f.contents];
        updatedContents[index] = {
          ...updatedContents[index],
          name: newName,
        };
        return {
          ...f,
          contents: updatedContents,
        };
      }
      return f;
    });

    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    const updatedFolder = updatedFolders.find((f) => f.id === parseInt(id));
    setFolder(updatedFolder);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const folders = JSON.parse(localStorage.getItem("folders"));
    const updatedFolders = folders.map((f) => {
      if (f.id === parseInt(id)) {
        const updatedContents = f.contents.filter((_, i) => i !== index);
        message.success("File deleted successfully");
        return {
          ...f,
          contents: updatedContents,
        };
      }
      return f;
    });

    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    const updatedFolder = updatedFolders.find((f) => f.id === parseInt(id));
    setFolder(updatedFolder);
    setContextMenu({ visible: false, x: 0, y: 0, contentIndex: null });
  };

  const addFile = () => {
    if (!uploadedFile) return;

    const folders = JSON.parse(localStorage.getItem("folders"));

    const updatedFolders = folders.map((f) => {
      if (f.id === parseInt(id)) {
        message.success("file uploaded successfully");

        return {
          ...f,
          contents: f.contents ? [...f.contents, uploadedFile] : [uploadedFile],
        };
      }
      return f;
    });

    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    const updatedFolder = updatedFolders.find((f) => f.id === parseInt(id));
    setFolder(updatedFolder);
    setUploadedFile(null);
    setIsModalOpen(false);
  };

  const handleFileDownload = (index) => {
    const content = folder.contents[index];
    if (!content || !content.url) {
      message.error("File not found");
      return;
    }

    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = content.url;
      link.download = content.name || `download_${index}`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success("Download started");
      setContextMenu({ visible: false, x: 0, y: 0, contentIndex: null });
    } catch (error) {
      console.error("Download error:", error);
      message.error("Failed to download file");
    }
  };

  const handleFileClick = (content) => {
    setIsGalleryOpen(true);
    setSelectedFile(content);
  };

  return (
    <div className="min-w-[200px] py-4 px-6 rounded-lg text-white border-[rgb(75,75,75)]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-white font-bold">{folder?.title}</h1>
        <button
          onClick={() => showModal()}
          className="text-[rgb(175,175,175)] rounded-full py-2 px-4 cursor-pointer bg-[rgb(51,51,51)] text-sm hover:text-white flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3rem"
            height="1.3rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 19h2v-4.175l1.6 1.6L16 15l-4-4l-4 4l1.425 1.4L11 14.825zm-5 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13h5l-5-5z"
            />
          </svg>
          Upload More Files
        </button>
        <Modal
          className="bg-black"
          title="Create Folder"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <div className="my-4 w-full flex items-center flex-col">
            <div className="flex relative z-[1] transition-all duration-150 text-[rgb(175,175,175)] cursor-pointer items-center justify-start my-4 w-full p-3 bg-transparent border border-[rgb(44,44,44)] rounded-lg  hover:text-white">
              <input
                className="opacity-0 w-full cursor-pointer  after:content-['click to upload'] after:text-white after:absolute after:top-1/2 left-1/2 after:translate-x-[-50%] after:translate-y-[-50%]"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
              <div className=" absolute top-1/2 left-1/2 translate-x-[-48%] flex items-center gap-2 translate-y-[-50%] z-[-1]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.5 15.577v-8.65l-2.33 2.33l-.708-.718L12 5l3.539 3.539l-.708.719L12.5 6.927v8.65zM6.616 19q-.691 0-1.153-.462T5 17.384v-2.423h1v2.423q0 .231.192.424t.423.192h10.77q.23 0 .423-.192t.192-.424v-2.423h1v2.423q0 .691-.462 1.153T17.384 19z"
                  />
                </svg>
                <span>
                  {uploadedFile ? uploadedFile.name : "Click Here to upload"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={addFile}
            className="my-2 bg-[rgb(51,51,51)] text-white py-2 px-4 rounded-lg"
          >
            Upload File
          </button>
        </Modal>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8  grid-flow-dense">
        {folder?.contents?.length > 0 ? (
          folder.contents.map((content, index) => (
            <div
              className="my-6 flex flex-col items-center gap-4"
              key={index}
              onClick={() => handleFileClick(content)}
              onContextMenu={(e) => handleContextMenu(e, index)}
            >
              <div className="h-24 w-24 overflow-hidden self-center rounded-xl">
                {renderContent(content)}
              </div>
              {editingIndex === index ? (
                <input
                  ref={inputRef}
                  type="text"
                  className="bg-[rgb(51,51,51)] w-1/2 text-white px-2 py-1 rounded outline-none"
                  defaultValue={content.name}
                  onBlur={(e) => handleRename(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRename(index, e.target.value);
                    }
                  }}
                />
              ) : (
                <span>
                  {content.name.length <= 13
                    ? content.name
                    : content.name.slice(0, 13) + "..." || `File ${index + 1}`}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="mt-10 flex items-center justify-center">
            <span className="text-[rgb(175,175,175)]">No contents</span>
          </div>
        )}
      </div>
      {contextMenu.visible && (
        <div
          className="fixed bg-[rgb(51,51,51)] rounded-lg py-2 shadow-lg z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="w-full px-4 py-1 flex items-center justify-start gap-2 text-left hover:bg-[rgb(75,75,75)] text-white"
            onClick={() => startRenaming(contextMenu.contentIndex)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
              </g>
            </svg>
            Rename
          </button>
          <button
            className="w-full px-4 py-1 flex items-center justify-start gap-2 text-left hover:bg-[rgb(75,75,75)] text-white"
            onClick={() => handleDelete(contextMenu.contentIndex)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
              />
            </svg>
            Delete
          </button>
          <button
            className="w-full px-4 py-1 flex items-center justify-start gap-2 text-left hover:bg-[rgb(75,75,75)] text-white"
            onClick={() => handleFileDownload(contextMenu.contentIndex)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 22V5M9 16l7 7l7-7M9 27h14"
              />
            </svg>
            Download
          </button>
        </div>
      )}
      <div>

      <Gallery 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        selectedImage={selectedFile}
        files={folder?.contents}
      />
      </div>
    </div>
  );
};

export default Folder;