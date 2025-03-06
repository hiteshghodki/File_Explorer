const FileSystem = [
  {
    id: 1,
    name: "Documents",
    type: "folders",
    children: [
      {
        id: 2,
        name: "image",
        type: "file",
        content: "Please check the file data",
      },
      {
        id: 3,
        name: "doc",
        type: "file",
        content: "please open the file data",
      },
    ],
  },
  {
    id: 4,
    name: "Data",
    type: "folders",
    children: [
      {
        id: 5,
        name: "text",
        type: "file",
        content: "We can check the file data",
      },
      {
        id: 6,
        name: "doc",
        type: "file",
        content: "We can open the file data",
      },
    ],
  },
];

export default FileSystem;
