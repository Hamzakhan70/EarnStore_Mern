import { MdDeleteForever } from "react-icons/md";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state: any) => state.commonFeature);
  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data: any) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }
  function deleteImageMethod(image: any) {
    console.log(image, "Trying to delete image with ID"); // Debug log

    dispatch(deleteFeatureImage(image.image)).then((data: any) => {
      console.log(data, "Delete API response"); // Debug log
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        isEditMode={false}
      />
      <Button
        disabled={!uploadedImageUrl}
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full"
      >
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem: any) => (
              <div className="relative" key={featureImgItem._id}>
                <button
                  onClick={() => {
                    deleteImageMethod(featureImgItem);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <MdDeleteForever />
                </button>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg border border-gray-200 p-4"
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default AdminDashboard;
