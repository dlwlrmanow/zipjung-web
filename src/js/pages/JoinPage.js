export const renderJoinContent= () => {
    return `
        
    `;

}

export const renderJoinPage = (container) => {
    // layut 제외
    container.innerHTML = renderJoinContent();

    joinEvent();
}