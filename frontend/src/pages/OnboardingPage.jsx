import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, MapPinIcon, ShipWheelIcon, LoaderIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {
  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    profilePicture: authUser?.profilePicture || "",
    location: authUser?.location || "",
  })

  const { mutate: onBoardingMutation, isPending } = useMutation({
  mutationFn: completeOnboarding,
  onSuccess: () => {
    toast.success("Profile onboarded successfully");
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },
  onError: (error) => {
    console.error("Onboarding error:", error);
    toast.error(error?.response?.data?.message || error.message || "Something went wrong");
  },
});


  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState);
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePicture: randomAvatar });
    toast.success("Random profile picture generated!");
  };


  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'> 
            {/* Profile picture  */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* Image Preview */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePicture ? (
                  <img src={formState.profilePicture} alt='Profile Preview' className='w-full h-full object-cover' />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-500 opacity-40' />
                  </div>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <button type="button" onClick={handleRandomAvatar} className='btn btn-sm btn-outline'>Generate Random Avatar</button>
              </div>
            </div>
                {/* full name */}
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input type="text" name='fullName' value={formState.fullName} onChange={(e) => setFormState({...formState, fullName: e.target.value})}
                className='input input-bordered w-full' 
                placeholder='Enter your full name'
                />
              </div>
                {/* Bio */}
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Bio</span>
                </label>
                <input type="text" name='bio' value={formState.bio} onChange={(e) => setFormState({...formState, bio: e.target.value})}
                className='textarea textarea-bordered h-24' 
                placeholder='Enter your bio'
                />
              </div>

                {/* Languages  */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                {/* Native Language  */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Native Language</span>
                  </label>
                  <select name="nativeLanguage" value={formState.nativeLanguage} onChange={(e) => setFormState({...formState, nativeLanguage: e.target.value})}
                    className='select select-bordered w-full'>
                      <option value="">Select Your Native Language</option>
                      {LANGUAGES.map((language) => (
                        <option key={language} value={language.toLowerCase()}>{language}</option>
                      ))}
                  </select>
                </div>

                {/* Learning Language  */}
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
                </div>
              </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
