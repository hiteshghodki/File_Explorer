import React, { useState } from "react";
import { Button, Box, Typography, IconButton, Stack } from "@mui/material";
import FileSystem from "./FileData";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutline from "@mui/icons-material/DriveFileRenameOutline";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileExplorer = () => {
  const [Files, FilesSet] = useState(FileSystem);
  const [selectFile, selectedFile] = useState(null);

  const toggleFolder = (folderId, items = Files) => {
    return items.map((item) => {
      if (item.id === folderId && item.type === "folders") {
        return { ...item, open: !item.open };
      }
      if (item.children) {
        return { ...item, children: toggleFolder(folderId, item.children) };
      }
      return item;
    });
  };

  const handletoggleFolder = (folderId) => {
    FilesSet(toggleFolder(folderId));
  };

  const onCreateItem = () => {
    const type = prompt("Enter Type (file/folder)");
    if (type !== "file" && type !== "folder") {
      alert("Please Enter Valid File/ Folder");
      return;
    }
    const name = prompt(`Enter the new name ${type}:`);
    if (!name) return;

    const newItem = {
      id: Date.now(),
      name,
      type,
      ...(type === "file"
        ? { content: `Content of ${name}` }
        : { children: [] }),
    };
    FilesSet((prevFiles) => [...prevFiles, newItem]);
  };

  const renameItem = (id, newName, items = Files) => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      if (item.children) {
        return { ...item, children: renameItem(id, newName, item.children) };
      }
      return item;
    });
  };

  const onRenameItem = (id) => {
    const newName = prompt("please Enter New Name");
    if (newName) {
      FilesSet(renameItem(id, newName));
    }
  };

  const deleteItem = (id, item = Files) => {
    return item
      .map((item) => {
        if (item.children) {
          return { ...item, children: deleteItem(id, item.children) };
        }
        return item;
      })
      .filter((item) => item.id !== id);
  };

  const onDeleteItem = (id) => {
    if (window.confirm("please confrim to Delete item")) {
      FilesSet(deleteItem(id));
      if (selectFile && selectFile.id == id) {
        selectedFile(null);
      }
    }
  };
  const onSelectFile = (file) => {
    selectedFile(file);
  };

  const renderFiles = (items) => {
    return items.map((item) => (
      <Box key={item.id} sx={{ pl: 2, my: 0.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {item.type === "folders" ? (
            <>
              <Button onClick={() => handletoggleFolder(item.id)} size="small">
                <FolderIcon />
                {item.name}
              </Button>
              <IconButton onClick={() => onRenameItem(item.id)} size="small">
                <DriveFileRenameOutline fontSize="small" />
              </IconButton>
              <IconButton onClick={() => onDeleteItem(item.id)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => onSelectFile(item)}
              >
                <InsertDriveFileIcon sx={{ mr: 0.5 }} /> {item.name}
              </Box>
              <IconButton onClick={() => onRenameItem(item.id)} size="small">
                <DriveFileRenameOutline fontSize="small" />
              </IconButton>

              <IconButton onClick={() => onDeleteItem(item.id)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
        {item.children && item.open && <Box>{renderFiles(item.children)}</Box>}
      </Box>
    ));
  };

  return (
    <Box sx={{ display: "flex", height: "110vh" }}>
      <Box sx={{ width: "30%", borderRight: "1px solid black" }}>
        <Typography variant="h6" gutterBottom>
          File Explorer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateItem}
          sx={{ mb: 2 }}
        >
          Create File/Folder
        </Button>
        {renderFiles(Files)}
      </Box>

      <Box sx={{ width: "70%", padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          File Content
        </Typography>
        {selectFile ? (
          <Box>
            <Typography variant="subtitle1">{selectFile.name}</Typography>
            <Typography variant="body1">{selectFile.content}</Typography>
          </Box>
        ) : (
          <Typography variant="body2">Select file to view content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FileExplorer;
