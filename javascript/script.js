document.addEventListener("DOMContentLoaded", function() {
    
    // 1. XỬ LÝ CLICK MỞ MENU CON
    const menuLinks = document.querySelectorAll('.has-submenu > a');
    
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const parentLi = this.parentElement;
            parentLi.classList.toggle('open');
            
            const siblings = parentLi.parentElement.children;
            for (let sibling of siblings) {
                if (sibling !== parentLi && sibling.classList.contains('has-submenu')) {
                    sibling.classList.remove('open');
                }
            }
        });
    });

    // 2. TÍNH NĂNG TÌM KIẾM THÔNG MINH BUNG MENU
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const allLinks = document.querySelectorAll('nav ul li a');

    function performSearch() {
        const keyword = searchInput.value.toLowerCase().trim();
        
        allLinks.forEach(a => a.classList.remove('highlight-search'));
        document.querySelectorAll('.has-submenu').forEach(li => li.classList.remove('open'));

        if (keyword === "") return;

        let found = false;

        allLinks.forEach(function(link) {
            const text = link.textContent.toLowerCase();
            const href = link.getAttribute('href');

            if (text.includes(keyword) && href && !href.includes('javascript')) {
                found = true;
                link.classList.add('highlight-search');

                let parent = link.parentElement;
                while (parent && parent.tagName !== 'NAV') {
                    if (parent.classList.contains('has-submenu')) {
                        parent.classList.add('open');
                    }
                    parent = parent.parentElement;
                }
                link.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        if (!found) {
            alert("Không tìm thấy địa điểm nào phù hợp với: " + keyword);
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // 3. TỰ ĐỘNG CHUYỂN CẢNH SLIDESHOW ẢNH (Nhắm trực tiếp vào thẻ img của article)
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.querySelectorAll("article > img");
        
        if (slides.length === 0) return;

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }    
        
        slides[slideIndex - 1].style.display = "block";  
        
        setTimeout(showSlides, 3000); // 3 giây đổi ảnh 1 lần
    }
});