const setCompletedBook = (book) => {
    let done = 0;
    const chapters = book.chapters.length;
    book.chapters.forEach(chapter => {
        if(chapter.completed === 100) {
            done += 1;
        }
    })

    return Math.round((done*100)/chapters);
}

const setCompletedChapter = (chapter, books, bookId, chapterId, milestoneId) => {
    let done = 1;
    const milestones = chapter.milestone.length;
    chapter.milestone.forEach(mlstn => {
        if(mlstn.isDone) {
            done += 1
        }
    })

    let res = Math.round((done*100)/milestones)
   
    return res 
}

const handleMilestoneComplete = (books, bookId, chapterId, milestoneId) => {
    let updated = books.map(book => book.id === bookId 
      ? {
        ...book,
        completed: setCompletedBook(book),
        chapters: book.chapters.map(chapter => chapter.id === chapterId
          ? {
            ...chapter,
            completed: setCompletedChapter(chapter, books, bookId, chapterId, milestoneId),
            milestone: chapter.milestone.map(mlstn => mlstn.id === milestoneId 
              ? {
                ...mlstn,
                isDone: true
              }
              : mlstn)
          }
          : chapter)
      }
      : book )

      updated = updated.map(bk => bk.id === bookId 
        ?{
            ...bk,
            completed: setCompletedBook(bk)
        }: bk)
  
    return updated;
}

// Increate extra time
const increateTime = (books, type, bookId, chapterId, milestoneId) => {
    const updated = books.map(book => book.id === bookId
        ? {
            ...book,
            extra: type === 'decrease' ? book.extra - 1 : book.extra + 1,
            chapters: book.chapters.map(chapter => chapter.id === chapterId
                ? {
                    ...chapter,
                    extra: type === 'decrease' ? chapter.extra - 1 : chapter.extra + 1,
                    milestone: chapter.milestone.map(mlstn => mlstn.id === milestoneId
                        ? {
                            ...mlstn,
                            extra: type === 'decrease' ? mlstn.extra - 1 : mlstn.extra + 1,
                        }
                        : mlstn)
                }
                : chapter)
        }
        : book)

    return updated;
}

export {
    handleMilestoneComplete,
    increateTime
}