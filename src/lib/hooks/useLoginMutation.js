import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (data) => {
        const res = await fetch(
            "https://mandalazz-copy-production.up.railway.app/api/user/login",
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            }
        );
    
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Login failed");
        }
    
        return res.json();
        },
    });  
}

export default useLoginMutation;