import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 유저 정보 전송
 * @param {questions, projectId}
 * @returns
 */

interface DetailInfoProps {
  name: string;
  date: string;
  interviewers: { id: number }[];
  age: number;
  education: string;
  position: string;
  phoneNumber: string;
  path: string;
  email: string;
  keywords: { name: string; keywordType: string }[];
  interviewId: string;
  // questions: { content: string }[];
}

export const usePostUserDetail = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["detailPost"],
    mutationFn: async (data: DetailInfoProps) => {
      const res = await axiosInstance.post(`/api/applicants`, data);
      console.log(res.data.applicantId);
      return Number(res.data.applicantId);
    },
  });

  return {
    detailPost: mutate,
    isPending,
    isSuccess,
    error,
  };
};
