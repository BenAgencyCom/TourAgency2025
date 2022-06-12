// Tools
import { useState, useEffect, useMemo } from "react";
// Types
import type { StatedDataField } from "@/@types/StatedDataField";

interface UseCarouselParams {
    imageIndex: StatedDataField<number>;
    urlInHighestResolution: string;
    modalMaxResolution?: string;
    advanceModalProperties?: {
        title: string;
        sectionName: string;
    };
}
interface UseCarouselResult {
    currentSectionName: string;
    currentImageTitle: string;
    currentImageURL: string;
    imagesInTotal: number;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (params: UseCarouselParams): UseCarouselResult => {
    // globalThis properties' names
    const MODAL_IMAGES_KEY = "modal-images";
    const MODAL_TITLES_KEY = "modal-titles";
    const MODAL_SECTION_NAMES_KEY = "modal-section-names";
    const MODAL_PATHNAME_KEY = "modal-pathname";

    const [allSectionNames, setAllSectionNames] = useState<string[]>([]);
    const [allImagesForModal, setAllImagesForModal] = useState<string[]>([]);
    const [allTitlesForModal, setAllTitlesForModal] = useState<string[]>([]);

    // Save information about this particular image in
    // globalThis object in order to allow users to visit all images without closing single modal
    if (params.advanceModalProperties && params.modalMaxResolution) {
        const { title, sectionName } = params.advanceModalProperties;
        const routerPathIsInvalid = !(globalThis as any)[MODAL_PATHNAME_KEY] || window.location.href !== (globalThis as any)[MODAL_PATHNAME_KEY];

        if (!(globalThis as any)[MODAL_IMAGES_KEY] || routerPathIsInvalid) {
            (globalThis as any)[MODAL_IMAGES_KEY] = [params.urlInHighestResolution];
            (globalThis as any)[MODAL_TITLES_KEY] = [title];
            (globalThis as any)[MODAL_SECTION_NAMES_KEY] = [sectionName];
            (globalThis as any)[MODAL_PATHNAME_KEY] = window.location.href;
        } else if (!(globalThis as any)[MODAL_IMAGES_KEY].includes(params.urlInHighestResolution)) {
            (globalThis as any)[MODAL_IMAGES_KEY].push(params.urlInHighestResolution);
            (globalThis as any)[MODAL_TITLES_KEY].push(title);
            (globalThis as any)[MODAL_SECTION_NAMES_KEY].push(sectionName);
        }
    }

    useEffect(() => {
        if (!params.advanceModalProperties) return;
        const images = (globalThis as any)[MODAL_IMAGES_KEY];
        setAllTitlesForModal((globalThis as any)[MODAL_TITLES_KEY]);
        setAllSectionNames((globalThis as any)[MODAL_SECTION_NAMES_KEY]);
        setAllImagesForModal(images);
        params.imageIndex.setValue(images.indexOf(params.urlInHighestResolution));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(globalThis as any)[MODAL_IMAGES_KEY], params.advanceModalProperties]);

    const currentSectionName = useMemo<string>(() => {
        return allSectionNames[params.imageIndex.value];
    }, [allSectionNames, params.imageIndex.value]);

    const currentImageTitle = useMemo<string>(() => {
        return allTitlesForModal[params.imageIndex.value];
    }, [allTitlesForModal, params.imageIndex.value]);

    const currentImageURL = useMemo<string>(() => {
        return allImagesForModal[params.imageIndex.value];
    }, [allImagesForModal, params.imageIndex.value]);

    return {
        currentSectionName,
        currentImageTitle,
        currentImageURL,
        imagesInTotal: allImagesForModal.length,
    };
};
