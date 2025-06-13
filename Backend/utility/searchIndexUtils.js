import { initializeSearchIndex } from "../Controller/SearchController.js";

// Call this function whenever a file is created, updated, or status changed
export const updateSearchIndex = async () => {
    try {
        // For now, we reinitialize the entire index
        // In production, you might want to implement incremental updates
        await initializeSearchIndex();
        console.log('Search index updated successfully');
    } catch (error) {
        console.error('Error updating search index:', error);
    }
};