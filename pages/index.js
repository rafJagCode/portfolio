import App from '@/components/app/App';
import Loader from '@/components/loader/Loader';
import useImagePreloading from '@/components/app/hooks/useImagePreloading';

export default function Page() {
  const { imagesReady, progress, currentImage } = useImagePreloading();
  return <>{!imagesReady ? <Loader progress={progress} currentImage={currentImage} /> : <App />}</>;
}
