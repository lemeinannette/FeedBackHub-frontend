import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { GoPerson } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { BiMessageRoundedEdit } from "react-icons/bi";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa6";

const steps = ['Personal Info', 'Event Details', 'Ratings', 'Comments'];
const icons = [<GoPerson />, <CiCalendar />, <FaRegStar />, <BiMessageRoundedEdit />];

const FeedBack = () => {
  const [step, setStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showCommentAlert, setShowCommentAlert] = useState(false);

  const [formData, setFormData] = useState({
    feedbackType: "",
    name: "",
    email: "",
    phone: "",
    event: "",
    ratings: { food: 0, ambience: 0, service: 0, overall: 0 },
    recommend: "",
    comments: ""
  });

  /* ---------------- NAVIGATION ---------------- */
  const next = () => {
    if (step < steps.length - 1 && isStepValid()) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [category]: value }
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const isStepValid = () => {
    if (step === 0) {
      if (!formData.feedbackType) return false;
      if (formData.feedbackType !== "anonymous") {
        return formData.name && formData.email && formData.phone;
      }
      return true;
    }

    if (step === 1) return !!formData.event;

    if (step === 2) {
      return (
        Object.values(formData.ratings).every(r => r > 0) &&
        !!formData.recommend
      );
    }

    if (step === 3) return !!formData.comments;

    return true;
  };

  const validateForm = () => {
    if (step === 3 && !formData.comments) {
      setShowCommentAlert(true);
      return "comments";
    }

    if (!isStepValid()) return "invalid";
    return null;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) return;

    try {
      const response = await fetch('http://127.0.0.1:5555/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit feedback');
      }

      setShowThankYou(true);

      setTimeout(() => {
        setShowThankYou(false);
        setStep(0);
        setFormData({
          feedbackType: "",
          name: "",
          email: "",
          phone: "",
          event: "",
          ratings: { food: 0, ambience: 0, service: 0, overall: 0 },
          recommend: "",
          comments: ""
        });
      }, 2500);

    } catch (error) {
      console.error(error);
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  /* ---------------- STEPS ---------------- */
  const renderStep = () => {
    const headerStyle = "flex justify-between w-full mb-4 text-[13px] font-semibold";
    const inputWrapper = "flex items-center text-[10px] bg-gray-100 rounded-md w-full p-2 gap-2";
    const inputClass = "bg-gray-100 w-full outline-none text-gray-800";

    switch (step) {
      case 0:
        return (
          <div className='flex w-full text-[13px] flex-col gap-4'>
            <div className={headerStyle}>
              <span>Personal Information</span>
              <span className='text-gray-500 text-[11px]'>Tell us about yourself</span>
            </div>

            <div className={inputWrapper}>
              <GoPerson className="text-gray-500" />
              <select
                name="feedbackType"
                onChange={handleChange}
                className="w-full outline-none bg-transparent p-2 rounded-md cursor-pointer"
              >
                <option value="">Select Feedback Type</option>
                <option value="anonymous">Anonymous</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </div>

            <div className={inputWrapper}>
              <GoPerson className="text-gray-500" />
              <input
                name="name"
                onChange={handleChange}
                className={inputClass}
                placeholder="Your Name"
                disabled={formData.feedbackType === "anonymous"}
              />
            </div>

            <div className={inputWrapper}>
              <MdEmail className="text-gray-500" />
              <input
                name="email"
                onChange={handleChange}
                className={inputClass}
                placeholder="Your Email"
                disabled={formData.feedbackType === "anonymous"}
              />
            </div>

            <div className={inputWrapper}>
              <MdPhone className="text-gray-500" />
              <input
                name="phone"
                onChange={handleChange}
                className={inputClass}
                placeholder="Phone Number"
                disabled={formData.feedbackType === "anonymous"}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className='flex w-full text-[13px] flex-col gap-4'>
            <div className={headerStyle}>
              <span>Event Details</span>
              <span className='text-gray-500 text-[11px]'>Tell us which event you attended</span>
            </div>

            <div className="flex items-center bg-white rounded-md border border-gray-300 shadow-sm w-full p-2 gap-2">
              <CiCalendar className="text-gray-500" />
              <select
                name="event"
                onChange={handleChange}
                className="w-full outline-none text-gray-800 bg-transparent p-2 rounded-md cursor-pointer"
              >
                <option value="">Select Event Type</option>
                <option value="corporate meeting">Corporate Meeting</option>
                <option value="wedding reception">Wedding Reception</option>
                <option value="birthday party">Birthday Party</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="product launch">Product Launch</option>
                <option value="team building">Team Building</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 2:
        const ratingCategories = [
          { key: "food", title: "Food", desc: "Quality and taste of the food" },
          { key: "ambience", title: "Ambience", desc: "Atmosphere and decor" },
          { key: "service", title: "Service", desc: "Staff helpfulness and speed" },
          { key: "overall", title: "Overall Experience", desc: "Your overall satisfaction" }
        ];

        return (
          <div className='flex w-full flex-col gap-4'>
            <div className={headerStyle}>
              <span>Ratings</span>
              <span className='text-gray-500 text-[11px]'>Rate your experience (1-5)</span>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {ratingCategories.map(cat => (
                <div key={cat.key} className='p-3 border border-gray-300 rounded-md shadow-sm flex flex-col items-start gap-2'>
                  <h3 className='font-semibold text-sm'>{cat.title}</h3>
                  <p className='text-gray-500 text-[11px]'>{cat.desc}</p>
                  <div className='flex gap-1'>
                    {[1,2,3,4,5].map(i => (
                      <FaStar
                        key={i}
                        size={18}
                        className={`cursor-pointer ${formData.ratings[cat.key] >= i ? "text-yellow-400" : "text-gray-300"}`}
                        onClick={() => handleRatingChange(cat.key, i)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4'>
              <h3 className='font-semibold mb-2 text-sm'>Would you recommend us?</h3>
              <div className='flex gap-4'>
                <div
                  onClick={() => setFormData(prev => ({ ...prev, recommend: "yes" }))}
                  className={`flex-1 p-3 border rounded-md cursor-pointer items-center justify-center flex gap-2 ${
                    formData.recommend === "yes" ? "bg-teal-100 border-teal-500" : "bg-white border-gray-300"
                  }`}
                >
                  <BsEmojiSmile size={24} className="text-yellow-400" />
                  <span>Yes</span>
                </div>

                <div
                  onClick={() => setFormData(prev => ({ ...prev, recommend: "no" }))}
                  className={`flex-1 p-3 border rounded-md cursor-pointer items-center justify-center flex gap-2 ${
                    formData.recommend === "no" ? "bg-teal-100 border-teal-500" : "bg-white border-gray-300"
                  }`}
                >
                  <BsEmojiFrown size={24} className="text-red-400" />
                  <span>No</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='flex w-full text-[13px] flex-col gap-4'>
            <div className={headerStyle}>
              <span>Comments</span>
              <span className='text-gray-500 text-[11px]'>Leave your thoughts and suggestions</span>
            </div>

            <div className="flex items-center bg-gray-100 rounded-md w-full p-3 gap-2">
              <textarea
                name="comments"
                rows="4"
                onChange={handleChange}
                className="bg-gray-100 w-full outline-none text-gray-800"
                placeholder="Your Comments..."
              />
            </div>
          </div>
        );
    }
  };

  /* ---------------- THANK YOU ---------------- */
  if (showThankYou) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 max-w-sm mx-4">
          <h2 className="text-2xl font-bold text-teal-600">Thank You!</h2>
          <p className="text-gray-700 text-center">
            Your feedback has been submitted successfully.
          </p>
          <DotLottieReact
            src="https://lottie.host/83a5229a-6400-425e-bd10-fba8c764e7a9/5VNgheTFJZ.lottie"
            loop
            autoplay
            className="w-40 h-40"
          />
        </div>
      </div>
    );
  }

  /* ---------------- MAIN ---------------- */
  return (
    <>
      {showCommentAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 flex flex-col items-center gap-3">
            <BsEmojiSmile size={40} className="text-yellow-400" />
            <h3 className="text-lg font-semibold text-gray-800">
              One more thing 😊
            </h3>
            <p className="text-[13px] text-gray-600 text-center">
              Please leave us a comment — it’s really useful and helps us improve.
            </p>
            <button
              onClick={() => setShowCommentAlert(false)}
              className="mt-2 px-4 py-1.5 text-sm rounded bg-linear-to-r from-teal-600 to-cyan-500 text-white"
            >
              Okay, I’ll comment
            </button>
          </div>
        </div>
      )}

      <div className='flex w-full items-start justify-center flex-col md:flex-row gap-5 mt-10 px-5'>
        <div className='flex-1 max-h-[80vh] overflow-y-auto scrollbar-none md:scrollbar-hide p-5'>
          <form
            className='flex rounded-lg shadow-lg h-auto flex-col w-full max-w-md items-center'
            onSubmit={handleSubmit}
          >
            <div className='px-5 py-4 bg-linear-to-r from-teal-600 to-cyan-500 rounded-t-lg w-full'>
              <h1 className='text-white text-2xl font-bold text-center'>Feedback Form</h1>
              <p className='text-gray-100 text-[11px] text-center mb-2'>
                We value your feedback and strive to improve our services
              </p>

              <div className="w-full bg-gray-300 h-2 rounded-full">
                <div
                  className="h-2 rounded-full bg-teal-600 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <p className="text-right text-[11px] text-gray-100 mt-1">
                {Math.round(progressPercentage)}%
              </p>
            </div>

            <div className='w-full flex justify-between p-4'>
              {steps.map((label, i) => (
                <div key={i} className="flex flex-col p-1 items-center w-full">
                  <div className={`text-lg ${step === i ? "text-teal-600" : "text-gray-500"}`}>
                    {icons[i]}
                  </div>
                  <p className={`text-[10px] mt-1 ${step === i ? "text-teal-600" : "text-gray-500"}`}>
                    {label}
                  </p>
                  <div className={`h-1 w-full rounded-full mt-1 ${step >= i ? "bg-teal-600" : "bg-gray-300"}`} />
                </div>
              ))}
            </div>

            <div className="p-5 w-full">{renderStep()}</div>

            <div className="flex justify-between w-full px-5 pb-5">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prev}
                  className="px-5 py-2 bg-gray-300 rounded text-sm text-gray-700"
                >
                  Back
                </button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!isStepValid()}
                  className={`px-5 py-1.5 rounded text-[13px] ${
                    isStepValid()
                      ? "bg-linear-to-r from-teal-600 to-cyan-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2 bg-linear-to-r from-teal-600 to-cyan-500 text-white rounded text-sm"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ANIMATED SECTION — UNTOUCHED */}
        <div className='hidden md:flex-1 md:sticky md:top-5 h-screen lg:flex items-center justify-center'>
          <DotLottieReact
            src="https://lottie.host/83a5229a-6400-425e-bd10-fba8c764e7a9/5VNgheTFJZ.lottie"
            loop
            autoplay
            className='w-full h-auto max-w-full'
          />
        </div>
      </div>
    </>
  );
};

export default FeedBack;
