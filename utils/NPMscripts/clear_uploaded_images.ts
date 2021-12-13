import fse from "fs-extra";
import path from "path";
import { uploadDir } from "../../utils/paths";

(async () => {
    console.clear();
    const foldersToRefresh = ["avatars"];
    //
    for (const folder of foldersToRefresh) {
        await fse.remove(path.join(uploadDir, folder));
        await fse.mkdir(path.join(uploadDir, folder));
        console.log(`${folder}- folder has been revamped successfully`);
    }
    //
})();
