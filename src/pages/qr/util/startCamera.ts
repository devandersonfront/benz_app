export const startCamera = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
      },
    });
  } catch (error) {
    console.error("카메라 액세스 오류:", error);
    alert("카메라 기능에 접근할 수 없습니다");
  }
};
