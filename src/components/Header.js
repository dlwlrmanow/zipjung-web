import zipjungIconUrl from '../assets/images/zipjung-icon.png'

export const Header = `
    <header class="bg-main-light-blue shadow-sm py-3 cursor-pointer" onclick="navigateTo('/')">
        <div class="container max-w-5xl-card mx-auto px-4 px-sm-5">
            <h1 class="h5 fw-bold text-main-dark-blue mb-0">
                <img src="${zipjungIconUrl}" class="me-2" style="width: 24px; height: 24px;">
                Zipjung!
            </h1>
        </div>
    </header>
`;