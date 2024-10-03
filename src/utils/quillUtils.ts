export const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	[{ 'align': [] }],
	['blockquote', 'code-block'],
	['link'],                                         // ['link', 'image', 'video']
	
	[{ 'header': 1 }, { 'header': 2 }],               // custom button values
	[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
	[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	[{ 'direction': 'rtl' }],                         // text direction
	
	[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	['clean'],                                         // remove formatting button

	[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	
	[{ 'font': [] }]
];


export const renameHeading = () => {
	const heading1Button = document.querySelector('.ql-header[data-value="1"]');
	if (heading1Button) {
		heading1Button.setAttribute('title', 'Título 1'); // Altera o título (tool tip)
		heading1Button.textContent = 'Título 1'; // Altera o texto exibido
	}
};