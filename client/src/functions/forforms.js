export const normalizeSliderImages = (images) => {
    if (!images) return "";

    if (Array.isArray(images)) {
        if (typeof images[0] === "string" && !images[0].startsWith("[")) {
            return images.join(", ");
        }
        if (typeof images[0] === "string" && images[0].startsWith("[")) {
            try {
                return JSON.parse(images[0]).join(", ");
            } catch {
                return "";
            }
        }
    }
    if (typeof images === "string") {
        return images;
    }

    return "";
};

