import { useMutation } from "@tanstack/react-query";
import { addBanner, uploadImagesToCloudinary } from "../../lib/api";
import { useState } from "react";
import { Button } from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";

export const DragAndDrop = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [error, setError] = useState("");

  const {
    mutate: UploadBanner,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (files: File[]) => uploadImagesToCloudinary(files),
    onSuccess: (res: any) => {
      const urls = res.map((r) => r.url as string);
      setUploaded(urls);
      addBanner(urls);
    },
  });

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const file_lens = 6;
    if (selectedImage.length + files.length > file_lens) {
      setError(`Just upload maximum ${file_lens} images`);
    }

    // Add image
    setSelectedImage((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrls((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (selectedImage.length > 0) {
      UploadBanner(selectedImage);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div className="border-2 border-dashed border-gray-200 h-64 hover:bg-slate-300 hover:border-blue-500">
          <div className="flex flex-col items-center justify-center mt-20">
            <Button
              variant="contained"
              component="label"
              startIcon={<IoCloudUploadOutline />}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                className="file-input"
                onChange={handleImageSelect}
                hidden
              />
            </Button>

            <p>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p>SVG, PNG, JPEG or GIF (MAX, 5mb)</p>
          </div>

          {imageUrls.length > 0 && (
            <div>
              {imageUrls.map((url, index) => {
                return (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`product ${index + 1}`}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
          )}
          <button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Uploading..." : "Upload"}
          </button>

          {uploaded.map((r, index) => (
            <div key={`Product + ${index + 1}`}>{r.url}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
