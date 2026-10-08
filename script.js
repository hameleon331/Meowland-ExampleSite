class Cat {
    constructor(name, description, price, images = []) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
    }
}

const cats = [

    new Cat(
        "Buddy",
        "A friendly and energetic cat looking for a loving home.",
        45,
        [
            "pictures/kotBuddy.jpg",
            "pictures/kotBuddy2.jpg"
        ]
    ),

    new Cat(
        "Luna",
        "Calm, affectionate, and happy to spend time with people.",
        60,
        [
            "pictures/kotLuna.jpg"
        ]
    ),
    new Cat(
        "Badzi",
        "Very, very silly. Sometimes playful, sometimes lazy, always silly ",
        100,
        [
            "pictures/kotBadzi.jpeg"
        ]
    ),
    new Cat(
        "Blubber",
        "Confused and a little dumb but sweet",
        1,
        [
            "pictures/kotBlubber.jpg"
        ]
    ),
    new Cat(
        "Czmyk",
        "Playful, a little crazy and bites a lot but not hard. Its just how he shows love!",
        500,
        [
            "pictures/kotCzmyk.jpg",
            "pictures/kotCzmyk2.jpg",
            "pictures/kotCzmyk3.jpg",
            "pictures/kotCzmyk4.jpg",
            "pictures/kotCzmyk5.jpg"
        ]
    ),
    new Cat(
        "Josephina",
        "Lazy and pompous. Typical cat really",
        -10,
        [
            "pictures/kotJosephina.jpg"
        ]
    ),
    new Cat(
        "Maciek",
        "Sweet goober, loves playing with children",
        76,
        [
            "pictures/kotMaciek.jpg"
        ]
    ),
    new Cat(
        "Menel",
        "A rescued stray. Calm and old. Smells a bit weird",
        2,
        [
            "pictures/kotMenel.jpg"
        ]
    ),
    new Cat(
        "Princess",
        "Sweetest little gem ever seen, small and fragile but purrs like an angel",
        400,
        [
            "pictures/kotPrincess.jpg"
        ]
    ),
    new Cat(
        "Rumcajs",
        "A smart cat, understands simple commands. Refuses to obey them. Brat",
        140,
        [
            "pictures/kotRumcajs.jpg"
        ]
    ),
    new Cat(
        "Szczur",
        "A cat. I think. Meows",
        999,
        [
            "pictures/kotSzczur.jpg"
        ]
    ),
    new Cat(
        "Max",
        "Playful and curious, with plenty of energy for an active family.",
        20,
        [
            "pictures/kotMax.jpg",
            "pictures/kotMax2.jpg",
            "pictures/kotMax3.jpg"
        ]
    )

];


const catsGrid = document.getElementById("cats-grid");

const profile = document.getElementById("cat-profile");
const profileImages = document.getElementById("profile-images");
const profileName = document.getElementById("profile-name");
const profileDescription = document.getElementById("profile-description");
const profilePrice = document.getElementById("profile-price");
const profileAdopt = document.getElementById("profile-adopt");
const profileCancel = document.getElementById("profile-cancel");

let adoptionList = [];

let displayedCats = [];

function renderCats() {

    catsGrid.innerHTML = "";

    const shuffledCats = [...cats]
        .sort(() => Math.random() - 0.5);

    displayedCats =
        shuffledCats.slice(0, 9);


    displayedCats.forEach((cat) => {
        const index =
            cats.indexOf(cat);

        const card =
            document.createElement("article");

        card.className =
            "cat-card";

        card.innerHTML = `
            <div class="cat-card__image">
                ${
                    cat.images[0]
                    ? `
                        <img
                            src="${cat.images[0]}"
                            alt="${cat.name}"
                            style="
                                width:200px;
                                height:200px;
                                object-fit:cover;
                            "
                        >
                    `
                    : "Main image"
                }
            </div>


            <h3 class="cat-card__name">
                ${cat.name}
            </h3>

        `;

        card.addEventListener(
            "click",
            () => openProfile(index)
        );
        catsGrid.appendChild(card);
    });

}


function openProfile(index) {

    const cat = cats[index];

    profileImages.innerHTML = "";

    cat.images.forEach((image, imageIndex) => {

        const imageElement = document.createElement("div");

        imageElement.className = "cat-profile__image";

        imageElement.innerHTML = `
            <img
                src="${image}"
                alt="${cat.name} photo ${imageIndex + 1}"
                style="width:300px;height:300px;object-fit:cover;"
            >
        `;

        profileImages.appendChild(imageElement);
    });


    if (cat.images.length === 0) {

        profileImages.innerHTML =
            '<div class="cat-profile__image">No images yet</div>';

    }


    profileName.textContent = cat.name;

    profileDescription.textContent =
        cat.description;

    profilePrice.textContent =
        cat.price + " $";


    profile.style.display = "flex";

    document.body.style.overflow = "hidden";


    const isPending = adoptionList.includes(cat);

profileAdopt.textContent = isPending
    ? "Pending adoption"
    : "Add to adoption list";

profileAdopt.disabled = isPending;

profileCancel.style.display =
    isPending ? "block" : "none";


profileAdopt.onclick = () => {

    if (adoptionList.includes(cat)) {
        return;
    }

    if (adoptionList.length >= 3) {

        alert(
            "Take it slow — you can only have 3 cats pending adoption at once."
        );

        return;
    }

    adoptionList.push(cat);

    profileAdopt.textContent =
        "Pending adoption";

    profileAdopt.disabled = true;

    profileCancel.style.display =
        "block";

    
};


profileCancel.onclick = () => {

    const index =
        adoptionList.indexOf(cat);

    if (index !== -1) {
        adoptionList.splice(index, 1);
    }

    profileAdopt.textContent =
        "Add to adoption list";

    profileAdopt.disabled = false;

    profileCancel.style.display =
        "none";

    
};
}


function closeProfile() {

    profile.style.display = "none";

    document.body.style.overflow = "";

}

document
    .getElementById("close-profile")
    .addEventListener("click", closeProfile);

profile.addEventListener("click", (event) => {

    if (event.target === profile) {
        closeProfile();
    }

})

function showAdoptionList() {

    const overlay = document.createElement("div");
    overlay.className = "adoption-overlay";
    
    const container = document.createElement("div");
    container.className = "adoption-container";
    
    const totalCost = adoptionList.reduce(
        (total, cat) => total + cat.price,
        0
    );

    adoptionList.forEach((cat) => {

        const card = document.createElement("div");
        card.className = "adoption-card";

        card.innerHTML = `
            <div class="adoption-card__image">
                ${
                    cat.images[0]
                        ? `
                            <img
                                src="${cat.images[0]}"
                                alt="${cat.name}"
                            >
                        `
                        : "No image"
                }
            </div>

            <h3>${cat.name}</h3>

            <p>${cat.price} €</p>
        `;

        container.appendChild(card);
    });

    const total = document.createElement("p");
    total.className = "adoption-total";
    total.textContent = `Total cost: ${totalCost} €`;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Go Back";

    closeButton.addEventListener("click", () => {
        overlay.remove();
    });

    container.appendChild(total);
    container.appendChild(closeButton);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

document
    .getElementById("reroll-cats")
    .addEventListener(
        "click",
        renderCats
    );

renderCats();