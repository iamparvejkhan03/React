function Heading({children, classes="", subTitle="", subTitleClasses="", containerClasses=""}){
    return (
        <div className={`my-5 ${containerClasses}`}>
            <h2 className={`text-xl md:text-2xl ${classes}`}>{children}</h2>
            <p className={`text-sm text-gray-600 sm:text-base ${subTitleClasses}`}>{subTitle}</p>
        </div>
    );
}

export default Heading;