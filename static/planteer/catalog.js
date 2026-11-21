(() => {
    const form = document.querySelector("[data-catalog-filters]");
    const params = new URLSearchParams(window.location.search);

    const queryField = form.elements.namedItem("q");
    const categoryField = form.elements.namedItem("category");
    const edibilityField = form.elements.namedItem("is_edible");
    queryField.value = params.get("q") ?? "";
    categoryField.value = params.get("category") ?? "";
    edibilityField.value = params.get("is_edible") ?? "";

    const query = queryField.value.trim().toLocaleLowerCase();
    const category = categoryField.value;
    const edibility = edibilityField.value;
    let matches = 0;

    for (const card of document.querySelectorAll("[data-plant-search]")) {
        const nameMatches = card.dataset.plantSearch.toLocaleLowerCase().includes(query);
        const categoryMatches = !category || card.dataset.category === category;
        const edibilityMatches = !edibility || card.dataset.edible === edibility;
        card.hidden = !(nameMatches && categoryMatches && edibilityMatches);
        if (!card.hidden) {
            matches += 1;
        }
    }

    document.querySelector("[data-result-count]").textContent = matches;
    document.querySelector("[data-empty-results]").hidden = matches !== 0;
})();
