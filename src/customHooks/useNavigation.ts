import { useRouter } from 'next/navigation';

const useNavigation = () => {

    const router = useRouter();
    
    const push = (destination: string) => {
        requestAnimationFrame(() => {
            router.push(destination);
        });
    }

    const windowRedirect = (destination: string) => {
        window.location.href = destination;
    }

    const goBack = () => router.back();

    return {
        push,
        windowRedirect,
        goBack
    }
}

export default useNavigation