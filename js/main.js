function setActiveDot(dotId) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));

    document.getElementById(dotId).classList.add('active');
}

function updateActiveDot() {
    const formList = document.getElementById('formList');
    const widthItem = document.querySelector('.item img').offsetWidth;
    const scrollPosition = formList.scrollLeft;

    const visibleDots = Array.from(document.querySelectorAll('.dot'))
        .filter(dot => dot.style.display !== 'none');
    
    if (visibleDots.length === 3) {
        if (scrollPosition < widthItem * 3) {
            setActiveDot('dot-1');
        } else if (scrollPosition < widthItem * 7) {
            setActiveDot('dot-5');
        } else {
            setActiveDot('dot-9');
        }
    } else if (visibleDots.length === 6) {
        if (scrollPosition < widthItem * 2) {
            setActiveDot('dot-1');
        } else if (scrollPosition < widthItem * 4) {
            setActiveDot('dot-3');
        } else if (scrollPosition < widthItem * 6) {
            setActiveDot('dot-5');
        } else if (scrollPosition < widthItem * 8) {
            setActiveDot('dot-7');
        } else if (scrollPosition < widthItem * 10) {
            setActiveDot('dot-9');
        } else {
            setActiveDot('dot-11');
        }
    } else if (visibleDots.length === 12) {
        const dotIndex = Math.floor(scrollPosition / widthItem);
        setActiveDot(`dot-${dotIndex + 1}`);
    }
}

function updateDotVisibility() {
    const dots = document.querySelectorAll('.dot');

    if (window.innerWidth <= 759) {
        // Hiển thị tất cả các dot
        dots.forEach(dot => dot.style.display = 'inline-block');
    } else if (window.innerWidth <= 1499) {
        // Hiển thị các dot 1, 3, 5, 7, 9, 11
        dots.forEach((dot, index) => {
            if ([0, 2, 4, 6, 8, 10].includes(index)) {
                dot.style.display = 'inline-block';
            } else {
                dot.style.display = 'none';
            }
        });
    } else {
        // Hiển thị chỉ các dot 1, 5, 9
        dots.forEach((dot, index) => {
            if ([0, 4, 8].includes(index)) {
                dot.style.display = 'inline-block';
            } else {
                dot.style.display = 'none';
            }
        });
    }

    attachClickEvents();
}

function attachClickEvents() {
    const visibleDots = Array.from(document.querySelectorAll('.dot'))
        .filter(dot => dot.style.display !== 'none');

    // Xóa sự kiện click cũ
    visibleDots.forEach(dot => {
        dot.onclick = null;
    });

    if (visibleDots.length === 3) {
        document.getElementById('dot-1').onclick = function () {
            document.getElementById('formList').scrollLeft = 0;
            setActiveDot('dot-1');
        };
        document.getElementById('dot-5').onclick = function () {
            const widthItem = document.querySelector('.item img').offsetWidth;
            document.getElementById('formList').scrollLeft = widthItem * 4;
            setActiveDot('dot-5');
        };
        document.getElementById('dot-9').onclick = function () {
            const widthItem = document.querySelector('.item img').offsetWidth;
            document.getElementById('formList').scrollLeft = widthItem * 8;
            setActiveDot('dot-9');
        };
    } else if (visibleDots.length === 6) {
        visibleDots.forEach((dot, index) => {
            dot.onclick = function () {
                const widthItem = document.querySelector('.item img').offsetWidth;
                document.getElementById('formList').scrollLeft = widthItem * index * 2;
                setActiveDot(dot.id);
            };
        });
    } else if (visibleDots.length === 12) {
        visibleDots.forEach((dot, index) => {
            dot.onclick = function () {
                const widthItem = document.querySelector('.item').offsetWidth;
                document.getElementById('formList').scrollLeft = widthItem * index;
                setActiveDot(dot.id);
            };
        });
    }
}

document.getElementById('formList').addEventListener('scroll', () => {
    updateActiveDot();
    updateNavigationButtons();
});

window.onresize = function() {
    setTimeout(() => {
        updateDotVisibility();
        attachClickEvents();
        updateNavigationButtons();
    }, 100);
};

window.onload = function() {
    updateDotVisibility();
    attachClickEvents();
    updateActiveDot();
    updateNavigationButtons();
};

document.getElementById('next').onclick = function () {
    if (this.classList.contains('disabled')) return;

    const widthItem = document.querySelector('.item img').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;

    updateNavigationButtons()
};

document.getElementById('prev').onclick = function () {
    if (this.classList.contains('disabled')) return;

    const widthItem = document.querySelector('.item img').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;

    updateNavigationButtons()
};

function updateNavigationButtons() {
    const formList = document.getElementById('formList');
    const widthItem = document.querySelector('.item img').offsetWidth;
    const totalWidth = formList.scrollWidth;
    const scrollPosition = formList.scrollLeft;
    const clientWidth = formList.clientWidth;
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    const scrollEndPosition = scrollPosition + clientWidth;

    // Cập nhật trạng thái của nút "prev"
    if (scrollPosition <= 0) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }

    // Cập nhật trạng thái của nút "next"
    if (scrollEndPosition >= totalWidth - 1) { 
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

