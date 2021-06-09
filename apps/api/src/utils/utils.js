export function getNextFolio(folio) {
    
    // Get number in the folio
    let newFolio = parseInt(folio.substring(2,6))

    // Add 1 to folio, stringify it, fill it with 0's
    // until has size 4, then add "RC" to the beginning
    // and return.
    return "RC" + (String(++newFolio)).padStart(4, "0")
     
}