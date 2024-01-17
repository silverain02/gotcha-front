import React, { useState } from "react";
import { styled } from "styled-components";

import KeywordBox from "./KeywordBox";
import LinkIcon from "../../assets/icons/LinkIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

const InterviewerInfo = ({ modify = true, wide = true }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [portfolios, setPortfolios] = useState<File[]>([]);

  const handleFiles = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const selectedFiles: FileList | null = event.target.files;
    console.log(fileType);

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles) as File[];

      if (fileType === "portfolio") {
        setPortfolios((prevPortfolios: File[]) => [
          ...prevPortfolios,
          ...filesArray,
        ]);
      } else {
        setFiles((prevFiles: File[]) => [...prevFiles, ...filesArray]);
      }
    }
  };

  const handleRemoveFile = (index: number, fileType: string) => {
    if (fileType === "portfolio") {
      const newPortfolios = [...portfolios];
      newPortfolios.splice(index, 1);
      setPortfolios(newPortfolios);
    } else {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
  };

  return (
    <Wrapper wide={wide}>
      <UserProfileDiv>
        <UserProfile></UserProfile>
        <UserName>가차린</UserName>
      </UserProfileDiv>
      <InterviewDiv wide={wide}>
        <InterviewBox>
          <InterviewTitle>면접일</InterviewTitle>
          {modify ? (
            <ChoiceDate type="date"></ChoiceDate>
          ) : (
            <InfoResult>12월 7일</InfoResult>
          )}
        </InterviewBox>
        <InterviewBox>
          <InterviewTitle>면접관</InterviewTitle>
          {/* 디자인 반영되면 수정 예정 */}
        </InterviewBox>
      </InterviewDiv>
      <BasicInfoDiv wide={wide}>
        <InfoBox>
          <Info>나이</Info>
          {modify ? <InfoInput /> : <InfoResult>25</InfoResult>}
        </InfoBox>
        <InfoBox>
          <Info>연락처</Info>
          {modify ? (
            <InfoInput />
          ) : (
            <InfoResult>인하대학교 시각디자인과 졸</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>학력</Info>
          {modify ? <InfoInput /> : <InfoResult>GUI 모션디자이너</InfoResult>}
        </InfoBox>
        <InfoBox>
          <Info>이메일</Info>
          {modify ? (
            <InfoInput type="email" />
          ) : (
            <InfoResult>gotcha@gmail.com</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>지원 직무</Info>
          {modify ? <InfoInput /> : <InfoResult>01012345678</InfoResult>}
        </InfoBox>
        <InfoBox>
          <Info>지원 경로</Info>
          {modify ? <InfoInput /> : <InfoResult>사람인</InfoResult>}
        </InfoBox>
      </BasicInfoDiv>
      <KeywordDiv wide={wide}>
        <KeywordBox modify={modify} />
        <KeywordBox modify={modify} />
        <KeywordBox modify={modify} />
        <Document>
          <KeyTitle>원본 서류</KeyTitle>
          <DocsDiv>
            {files.map((file, index) => (
              // <Docs key={index}>{`${file.name}`}</Docs>
              <Docs key={index}>
                지원서
                <CloseIcon
                  width={16}
                  height={16}
                  fill="#999999"
                  onClick={() => handleRemoveFile(index, "resume")}
                />
              </Docs>
            ))}

            {modify && (
              <>
                <Portfolio htmlFor="file">
                  <LinkIcon width="20" height="20" fill="#999999" />
                  <div>지원서</div>
                </Portfolio>
                <FileInput
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  onChange={(e) => handleFiles(e, "resume")}
                ></FileInput>
              </>
            )}
            {portfolios.map((portfolio, index) => (
              <Docs key={index}>
                포트폴리오
                <CloseIcon
                  width={16}
                  height={16}
                  fill="#999999"
                  onClick={() => handleRemoveFile(index, "portfolio")}
                />
              </Docs>
            ))}

            {modify && (
              <>
                <Portfolio htmlFor="portfolio">
                  <LinkIcon width="20" height="20" fill="#999999" />
                  <div>포트폴리오</div>
                </Portfolio>
                <FileInput
                  type="file"
                  name="portfolio"
                  id="portfolio"
                  multiple
                  onChange={(e) => handleFiles(e, "portfolio")}
                ></FileInput>
              </>
            )}
          </DocsDiv>
        </Document>
      </KeywordDiv>
    </Wrapper>
  );
};

export default InterviewerInfo;

const Wrapper = styled.div<{ wide: boolean }>`
  padding: ${({ wide }) => (wide ? "6.8rem 3.5rem" : "2.5rem 2.1rem")};
`;

const UserProfileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3.6rem;
  width: 24rem;
`;

const UserProfile = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  background-color: var(--blue-200, #e5ecff);
`;

const FontStyle = styled.div`
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;

const UserName = styled(FontStyle)`
  color: var(--purple-900, #161466);
  font-size: 36px;
  width: 16rem;
`;

const InterviewDiv = styled.div<{ wide: boolean }>`
  display: grid;
  grid-template-columns: ${({ wide }) => (wide ? "repeat(2, 1fr)" : "1fr")};
  gap: 2rem;
  margin: 3rem 0 5.5rem;
`;

const InterviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const InterviewTitle = styled(FontStyle)`
  color: var(--purple-600, #3733ff);
  width: 5.5rem;
  font-size: 14px;
`;

const ChoiceDate = styled.input`
  border: none;
`;

const BasicInfoDiv = styled.div<{ wide: boolean }>`
  display: grid;
  grid-template-columns: ${({ wide }) => (wide ? "repeat(2, 1fr)" : "1fr")};
  gap: 1.2rem 3.8rem;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.2rem;
`;

const Info = styled(FontStyle)`
  color: var(--Gray-1100, #1a1a1a);
  width: 5.2rem;
  font-size: 14px;
`;

const InfoResult = styled(FontStyle)`
  color: var(--Gray-1100, #1a1a1a);
  width: 23.8rem;
  text-align: start;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.042px;
`;

const InfoInput = styled.input`
  display: flex;
  padding: 0.2rem 1rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.4rem;
  border: 0.04rem solid var(--purple-100, #f3f2ff);
  background: var(--Gray-200, #f6f6f6);
`;

const KeywordDiv = styled.div<{ wide: boolean }>`
  display: grid;
  grid-template-columns: ${({ wide }) => (wide ? "repeat(2, 1fr)" : "1fr")};
  gap: 3.4rem 0;
  margin: 5rem 0 0;
`;

const Document = styled.div``;

const DocsDiv = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const KeyTitle = styled.div`
  margin-bottom: 0.8rem;
  color: var(--Gray-1100, #1a1a1a);

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;

const Docs = styled.div`
  display: flex;
  padding: 0.2rem 1rem;
  text-overflow: ellipsis;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border-radius: 20px;
  border: 1px solid var(--purple-600, #3733ff);
  background: var(--Gray-100, #fff);

  color: var(--purple-600, #3733ff);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.036px;
`;

const Portfolio = styled.label`
  display: flex;
  padding: 2px 10px;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  border-radius: 20px;
  background: var(--Gray-200, #f6f6f6);

  color: var(--Gray-500, #b3b3b3);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.036px;
`;

const FileInput = styled.input`
  display: none;
`;
