import React, { useState } from 'react';
import OwnerNavbar from '../../../components/owner/Header/OwnerNavbar';
import Footer from '../../../components/user/Footer/footer';
import { OWNER_API } from '../../../constants';
import showToast from '../../../utils/toaster';
import { useFormik } from 'formik';
import uploadImagesToCloudinary from '../../../API/uploadImages';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { validateVenueUpload } from '../../../utils/validation';
import axiosInstance from '../../../utils/axiosInstance';


const VenueUpload = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string | null>(null);
  const [secondaryImagesPreview, setSecondaryImagesPreview] = useState<string[]>([]);
  const ownerId = useSelector((state: RootState) => state.ownerSlice.id);
  console.log(ownerId, "ownerid");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      if (id === 'primaryImage') {
        const file = files[0];
        formik.setFieldValue('primaryImage', file);
        const reader = new FileReader();
        reader.onload = () => {
          setPrimaryImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (id === 'secondaryImage') {
        const secondaryFiles = Array.from(files);
        formik.setFieldValue('secondaryImage', secondaryFiles);
        const previews = secondaryFiles.map(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setSecondaryImagesPreview(prevPreviews => [...prevPreviews, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
          return '';
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      sportsitem: '',
      place:'',
      description: '',
      primaryImage: null,
      secondaryImage: null,
    },
    validate:validateVenueUpload,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const primaryImageUrl = values.primaryImage ? await uploadImagesToCloudinary([values.primaryImage]) : [];
        const secondaryImagesUrls = values.secondaryImage ? await uploadImagesToCloudinary(values.secondaryImage) : [];
        const venueData = {
          name: values.name,
          sportsitem: values.sportsitem,
          place: values.place,
          description: values.description,
          primaryImage: primaryImageUrl?.[0] || '',
          secondaryImages: secondaryImagesUrls,
          ownerId: ownerId, 
        };
        // console.log(venueData, "venue data in frnt end");
        const response = await axiosInstance.post(`${OWNER_API}/upload-venues`, { venueData });
          showToast('Venue uploaded successfully', 'success');
          // navigate('/owner/upload-venues');
      } catch (error) {
        showToast('Error uploading venue', 'error');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <OwnerNavbar />
      <div className="min-h-screen flex flex-col bg-gray-100 pt-16">
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload Venue</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium">Venue Name</label>
                  <input type="text"
                   className="w-full px-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" 
                   id='name'
                    {...formik.getFieldProps("name")} 
                    />
                    {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Sports Item</label>
                  <input type="text"
                   className="w-full px-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" 
                   id='sportsitem' 
                   {...formik.getFieldProps("sportsitem")}
                    />
                  {formik.errors.sportsitem && formik.touched.sportsitem && (
                  <div className="text-red-500">{formik.errors.sportsitem}</div>
                )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    id='place'
                    {...formik.getFieldProps("place")}
                  />
                  {formik.errors.place && formik.touched.place && (
                  <div className="text-red-500">{formik.errors.place}</div>
                )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea 
                className="w-full px-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" 
                id='description'
                 {...formik.getFieldProps("description")}>
                 </textarea>
                 {formik.errors.description && formik.touched.description && (
                  <div className="text-red-500">{formik.errors.description}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Primary Image</label>
                <div className="flex items-center">
                  <input type="file" 
                  id="primaryImage" 
                  className="hidden" accept='image/*' 
                  onChange={handleFileChange} />
                  <label htmlFor="primaryImage" className="w-full px-3 py-3 border rounded bg-white cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <span className="text-gray-500">Choose file...</span>
                  </label>
                  {formik.errors.primaryImage && formik.touched.primaryImage && (
                  <div className="text-red-500">{formik.errors.primaryImage}</div>
                )}
                </div>
              </div>
              {primaryImagePreview && (
                <div className="mb-4">
                  <img
                    src={primaryImagePreview}
                    alt="Primary Image Preview"
                    className="w-48 h-36 object-cover mb-4" 
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Secondary Images</label>
                <div className="flex items-center">
                  <input type="file" id="secondaryImage" className="hidden" multiple onChange={handleFileChange} />
                  <label htmlFor="secondaryImage" className="w-full px-3 py-3 border rounded bg-white cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <span className="text-gray-500">Choose files...</span>
                  </label>
                  {formik.errors.secondaryImage && formik.touched.secondaryImage && (
                  <div className="text-red-500">{formik.errors.secondaryImage}</div>
                )}

                </div>
              </div>
              {secondaryImagesPreview.length > 0 && (
                <div className="mb-4 flex flex-wrap">
                  {secondaryImagesPreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Secondary Image Preview ${index + 1}`}
                      className="w-48 h-36 object-cover mr-4 mb-4" 
                    />
                  ))}

                </div>
              )}
              <div className="flex justify-center">
                <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-200" disabled={isSubmitting}>
                  {isSubmitting ? 'Uploading...' : 'Verify'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default VenueUpload;
