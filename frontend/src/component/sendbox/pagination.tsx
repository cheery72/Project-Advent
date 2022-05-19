import { useEffect } from 'react';
import styles from '../../../styles/sendbox/pagination.module.css'

const createPagination = (params:any) => {
    const {
        numberOfPages,
        currentPage,
        numberOfButtons
    } = params;

    if (currentPage > numberOfPages || currentPage < 1) {
        return {
            pagination: [],
            currentPage
        };
    }

    const buttons = Array(numberOfPages)
        .fill(1)
        .map((e, i) => e + i);
        
    const sideButtons =
        numberOfButtons % 2 === 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2;

    const calculLeft = (rest = 0) => {
        return {
            array: buttons
                .slice(0, currentPage - 1)
                .reverse()
                .slice(0, sideButtons + rest)
                .reverse(),
                rest: function() {
                    return sideButtons - this.array.length;
                }
        };
    };

    const calculRight = (rest = 0) => {
        return {
            array: buttons.slice(currentPage).slice(0, sideButtons + rest),
            rest: function() {
                return sideButtons - this.array.length;
                }
        };
    };

    const leftButtons = calculLeft(calculRight().rest()).array;
    const rightButtons = calculRight(calculLeft().rest()).array;

    return {
        pagination: [...leftButtons, currentPage, ...rightButtons],
        currentPage
    };
};


const Pagination = ({ currentPage, setCurrentPage, totalPages }:any) => {
    const { pagination } = createPagination({
        numberOfPages: totalPages,
        numberOfButtons: 4,
        currentPage
        }
    );

    // 마지막페이지에서 삭제했을때 페이지수가 줄어드는 경우 currentPage가 기존 페이지가 아닌 마지막페이지로 바뀌도록 수정
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [totalPages])
    
    const handleClick = (page:any) => setCurrentPage(page);

    return (
    <div className={ styles.pagination }>
        <ul>
            <li
                className={`${pagination[0] === currentPage && styles.disabled}`}
                onClick={handleClick.bind(null, currentPage - 1)}
            >
                Prev
            </li>
                {pagination.map(page => (
                    <li
                        className={`${currentPage === page && styles.active}`}
                        onClick={handleClick.bind(null, page)}
                        key={page}
                    >
                        {page}
                    </li>
                    ))
                }
            <li
                className={`${pagination.reverse()[0] === currentPage && styles.disabled}`}
                onClick={handleClick.bind(null, currentPage + 1)}
            >
                Next
            </li>
        </ul>
    </div>
    )
}

export default Pagination
