document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profileForm");
    const profileSummary = document.getElementById("profileSummary");
    const profilePhoto = document.getElementById("profilePhoto");
    const summaryDisplay = document.getElementById("summaryDisplay");
    const photoDisplay = document.getElementById("photoDisplay");

    function saveProfile() {
        summaryDisplay.textContent = profileSummary.value.trim();
        if (profilePhoto.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                photoDisplay.src = reader.result;
                photoDisplay.style.display = "block";
            };
            reader.readAsDataURL(profilePhoto.files[0]);
        } else {
            photoDisplay.style.display = "none";
        }
    }

    const skillForm = document.getElementById("skillForm");
    const skillName = document.getElementById("skillName");
    const skillCategory = document.getElementById("skillCategory");
    const skillLevel = document.getElementById("skillLevel");
    const skillsContainer = document.getElementById("skillsContainer");

    function addSkill() {
        if (skillName.value.trim() && skillLevel.value.trim()) {
            const skillItem = document.createElement("div");
            skillItem.classList.add("skill-bar");

            const skillInfo = document.createElement("p");
            skillInfo.textContent = `${skillName.value} (${skillCategory.value}) - ${skillLevel.value}%`;

            const bar = document.createElement("div");
            bar.classList.add("bar");
            const barFill = document.createElement("div");
            barFill.style.width = `${skillLevel.value}%`;
            bar.appendChild(barFill);

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "✖ Remove";
            removeBtn.className = "remove-btn";
            removeBtn.addEventListener("click", () => {
                skillsContainer.removeChild(skillItem);
            });

            skillItem.appendChild(skillInfo);
            skillItem.appendChild(bar);
            skillItem.appendChild(removeBtn);

            skillsContainer.appendChild(skillItem);
            skillForm.reset();
        }
    }

    const educationForm = document.getElementById("educationForm");
    const eduInstitute = document.getElementById("eduInstitute");
    const eduDegree = document.getElementById("eduDegree");
    const eduYear = document.getElementById("eduYear");
    const educationContainer = document.getElementById("educationContainer");

    function addEducation() {
        if (eduInstitute.value.trim() && eduDegree.value.trim() && eduYear.value.trim()) {
            const educationItem = document.createElement("div");
            educationItem.classList.add("education-item");

            const eduDetails = document.createElement("p");
            eduDetails.textContent = `${eduDegree.value} from ${eduInstitute.value} (${eduYear.value})`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "✖ Remove";
            removeBtn.className = "remove-btn";
            removeBtn.addEventListener("click", () => {
                educationContainer.removeChild(educationItem);
            });

            educationItem.appendChild(eduDetails);
            educationItem.appendChild(removeBtn);
            educationContainer.appendChild(educationItem);
            educationForm.reset();
        }
    }

    const experienceForm = document.getElementById("experienceForm");
    const expTitle = document.getElementById("expTitle");
    const expCompany = document.getElementById("expCompany");
    const expDetails = document.getElementById("expDetails");
    const expDuration = document.getElementById("expDuration");
    const experienceContainer = document.getElementById("experienceContainer");

    function addExperience() {
        if (expTitle.value.trim() && expCompany.value.trim() && expDetails.value.trim() && expDuration.value.trim()) {
            const experienceItem = document.createElement("div");
            experienceItem.classList.add("experience-item");

            const expInfo = document.createElement("p");
            expInfo.textContent = `${expTitle.value} at ${expCompany.value} (${expDuration.value})`;
            const expDesc = document.createElement("p");
            expDesc.textContent = expDetails.value;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "✖ Remove";
            removeBtn.className = "remove-btn";
            removeBtn.addEventListener("click", () => {
                experienceContainer.removeChild(experienceItem);
            });

            experienceItem.appendChild(expInfo);
            experienceItem.appendChild(expDesc);
            experienceItem.appendChild(removeBtn);
            experienceContainer.appendChild(experienceItem);
            experienceForm.reset();
        }
    }

    const contactForm = document.getElementById("contactForm");
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactPhone = document.getElementById("contactPhone");
    const contactLinkedIn = document.getElementById("contactLinkedIn");
    const contactGitHub = document.getElementById("contactGitHub");
    const contactDisplay = document.getElementById("contactDisplay");

    function saveContact() {
        contactDisplay.innerHTML = `
            <p><strong>Name:</strong> ${contactName.value}</p>
            <p><strong>Email:</strong> ${contactEmail.value}</p>
            ${contactPhone.value ? `<p><strong>Phone:</strong> ${contactPhone.value}</p>` : ""}
            ${contactLinkedIn.value ? `<p><strong>LinkedIn:</strong> <a href="${contactLinkedIn.value}" target="_blank">${contactLinkedIn.value}</a></p>` : ""}
            ${contactGitHub.value ? `<p><strong>GitHub:</strong> <a href="${contactGitHub.value}" target="_blank">${contactGitHub.value}</a></p>` : ""}
        `;
    }


    function generateResume() {
        const templateStyle = document.getElementById("templateStyle").value;
        const resumeContent = document.createElement("div");
        
        const name = document.getElementById("contactName").value || "Your Name";
        const email = document.getElementById("contactEmail").value || "email@example.com";
        const phone = document.getElementById("contactPhone").value || "Phone Number";
        const linkedin = document.getElementById("contactLinkedIn").value || "LinkedIn Profile";
        const github = document.getElementById("contactGitHub").value || "GitHub Profile";
        const summary = document.getElementById("profileSummary").value || "Professional Summary";
        
        const skillElements = document.querySelectorAll(".skill-bar");
        const skills = Array.from(skillElements).map(skill => {
            const text = skill.querySelector("p").textContent;
            return text.split(" (")[0]; 
        });
    
        const eduElements = document.querySelectorAll(".education-item");
        const education = Array.from(eduElements).map(edu => {
            return edu.querySelector("p").textContent;
        });
    
        const expElements = document.querySelectorAll(".experience-item");
        const experience = Array.from(expElements).map(exp => {
            const title = exp.querySelector("p").textContent;
            const details = exp.querySelectorAll("p")[1].textContent;
            return { title, details };
        });
    
        let template = '';
        
        switch(templateStyle) {

        case 'premium':
        template = `
        <div style="font-family: 'Inter', sans-serif; max-width: 8.5in; margin: 0 auto; background: linear-gradient(to bottom right, #ffffff, #f8f9fa);">
            <div style="display: grid; grid-template-columns: 320px 1fr;">
                <!-- Sidebar - keeping the same as before -->
                <div style="background: linear-gradient(150deg, #1a237e 0%, #283593 50%, #3949ab 100%); color: white; padding: 3em 2em; min-height: 100vh; position: relative; overflow: hidden;">
                    <!-- Previous sidebar content remains unchanged -->
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%); z-index: 1;"></div>
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%); background-size: 20px 20px; z-index: 1;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                        <div style="text-align: center; margin-bottom: 3.5em;">
                            <div style="width: 140px; height: 140px; background: rgba(255,255,255,0.9); border-radius: 70px; margin: 0 auto 1.5em; display: flex; align-items: center; justify-content: center; font-size: 3em; color: #1a237e; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                                ${name.charAt(0)}
                            </div>
                            <h1 style="margin: 0; font-size: 2em; font-weight: 600; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">${name}</h1>
                        </div>
                        
                        <div style="margin-bottom: 3em;">
                            <h2 style="font-size: 1.2em; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 1.5em; opacity: 0.9; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 0.5em;">Contact</h2>
                            <div style="display: flex; flex-direction: column; gap: 1.2em; font-size: 0.95em;">
                                <div style="display: flex; align-items: center; gap: 1em;">
                                    <span style="background: rgba(255,255,255,0.1); padding: 0.5em; border-radius: 50%;">📧</span>
                                    <span style="opacity: 0.9;">${email}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1em;">
                                    <span style="background: rgba(255,255,255,0.1); padding: 0.5em; border-radius: 50%;">📱</span>
                                    <span style="opacity: 0.9;">${phone}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1em;">
                                    <span style="background: rgba(255,255,255,0.1); padding: 0.5em; border-radius: 50%;">🔗</span>
                                    <span style="opacity: 0.9;">${linkedin}</span>
                                </div>
                                ${github ? `
                                <div style="display: flex; align-items: center; gap: 1em;">
                                    <span style="background: rgba(255,255,255,0.1); padding: 0.5em; border-radius: 50%;">💻</span>
                                    <span style="opacity: 0.9;">${github}</span>
                                </div>` : ''}
                            </div>
                        </div>
                        
                        <div>
                            <h2 style="font-size: 1.2em; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 1.5em; opacity: 0.9; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 0.5em;">Expertise</h2>
                            <div style="display: flex; flex-wrap: wrap; gap: 1em;">
                                ${skills.map(skill => `
                                    <span style="background: rgba(255,255,255,0.1); padding: 0.7em 1.2em; border-radius: 25px; font-size: 0.9em; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px);">${skill}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content - Updated text colors -->
                <div style="padding: 3.5em; background: white;">
                    <section style="margin-bottom: 4em;">
                        <h2 style="color: #1a237e; font-size: 1.8em; margin-bottom: 0.8em; position: relative; display: inline-block;">Professional Summary</h2>
                        <div style="width: 100px; height: 4px; background: linear-gradient(90deg, #1a237e, #3949ab); margin-bottom: 2em; border-radius: 2px;"></div>
                        <p style="color: #2c3e50; line-height: 1.8; font-size: 1.05em; text-align: justify; font-weight: 400;">${summary}</p>
                    </section>

                    <section style="margin-bottom: 4em;">
                        <h2 style="color: #1a237e; font-size: 1.8em; margin-bottom: 0.8em;">Experience</h2>
                        <div style="width: 100px; height: 4px; background: linear-gradient(90deg, #1a237e, #3949ab); margin-bottom: 2em; border-radius: 2px;"></div>
                        ${experience.map(exp => `
                            <div style="margin-bottom: 2.5em; padding: 2em; background: linear-gradient(to right bottom, #ffffff, #f8f9fa); border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative;">
                                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #1a237e, #3949ab); border-radius: 4px 0 0 4px;"></div>
                                <h3 style="color: #1a237e; font-size: 1.3em; margin-bottom: 0.8em; font-weight: 600;">${exp.title}</h3>
                                <p style="color: #34495e; line-height: 1.7; font-weight: 400;">${exp.details}</p>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <h2 style="color: #1a237e; font-size: 1.8em; margin-bottom: 0.8em;">Education</h2>
                        <div style="width: 100px; height: 4px; background: linear-gradient(90deg, #1a237e, #3949ab); margin-bottom: 2em; border-radius: 2px;"></div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5em;">
                            ${education.map(edu => `
                                <div style="padding: 1.8em; background: linear-gradient(to right bottom, #ffffff, #f8f9fa); border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                    <p style="color: #2c3e50; margin: 0; line-height: 1.6; font-weight: 500;">${edu}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;
    break;


                case 'modern':
                    template = `
                        <div style="font-family: 'Poppins', sans-serif; max-width: 8.5in; margin: 0 auto; background: #ffffff;">
                            <!-- Geometric Header -->
                            <div style="position: relative; padding: 4em 3em; overflow: hidden;">
                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #6c5ce7 0%, #a8a4e6 100%); transform: skewY(-6deg); transform-origin: top left;"></div>
                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1;">
                                    ${Array(20).fill().map((_, i) => `
                                        <div style="position: absolute; width: 20px; height: 20px; border: 2px solid white; transform: rotate(45deg); top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;"></div>
                                    `).join('')}
                                </div>
                                <div style="position: relative; z-index: 1; color: white;">
                                    <h1 style="font-size: 3.5em; margin: 0; font-weight: 700;">${name}</h1>
                                    <div style="margin-top: 2em; display: flex; flex-wrap: wrap; gap: 2em; font-size: 0.9em;">
                                        <span style="display: flex; align-items: center; gap: 0.5em;">✉ ${email}</span>
                                        <span style="display: flex; align-items: center; gap: 0.5em;">📱 ${phone}</span>
                                        <span style="display: flex; align-items: center; gap: 0.5em;">🔗 ${linkedin}</span>
                                        ${github ? `<span style="display: flex; align-items: center; gap: 0.5em;">💻 ${github}</span>` : ''}
                                    </div>
                                </div>
                            </div>
            
                            <!-- Content -->
                            <div style="padding: 3em;">
                                <!-- Summary -->
                                <section style="margin-bottom: 4em; position: relative;">
                                    <div style="position: absolute; left: -20px; top: 0; bottom: 0; width: 4px;">
                                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 50%; background: #6c5ce7;"></div>
                                        <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: #a8a4e6;"></div>
                                    </div>
                                    <p style="color: #4a4a4a; line-height: 1.8; font-size: 1.1em;">${summary}</p>
                                </section>
            
                                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 4em;">
                                    <!-- Main Content -->
                                    <div>
                                        <!-- Experience -->
                                        <section style="margin-bottom: 4em;">
                                            <h2 style="color: #6c5ce7; font-size: 1.8em; margin-bottom: 1.5em; display: flex; align-items: center; gap: 1em;">
                                                Experience
                                                <span style="flex-grow: 1; height: 2px; background: linear-gradient(90deg, #6c5ce7 0%, #a8a4e6 100%);"></span>
                                            </h2>
                                            ${experience.map(exp => `
                                                <div style="margin-bottom: 2.5em; padding: 2em; background: #f8f9fa; border-radius: 15px; position: relative; overflow: hidden;">
                                                    <div style="position: absolute; top: 0; right: 0; width: 40px; height: 40px; background: #6c5ce7; transform: rotate(45deg) translate(30%, -30%);"></div>
                                                    <h3 style="color: #2d2d2d; font-size: 1.3em; margin-bottom: 0.8em;">${exp.title}</h3>
                                                    <p style="color: #4a4a4a; line-height: 1.6;">${exp.details}</p>
                                                </div>
                                            `).join('')}
                                        </section>
                                    </div>
            
                                    <!-- Sidebar -->
                                    <div>
                                        <!-- Skills -->
                                        <section style="margin-bottom: 4em;">
                                            <h2 style="color: #6c5ce7; font-size: 1.8em; margin-bottom: 1.5em; display: flex; align-items: center; gap: 1em;">
                                                Skills
                                                <span style="flex-grow: 1; height: 2px; background: linear-gradient(90deg, #6c5ce7 0%, #a8a4e6 100%);"></span>
                                            </h2>
                                            <div style="display: flex; flex-wrap: wrap; gap: 1em;">
                                                ${skills.map(skill => `
                                                    <span style="background: white; color: #6c5ce7; padding: 0.8em 1.5em; border-radius: 25px; font-size: 0.9em; border: 2px solid #6c5ce7; transition: all 0.3s ease;">${skill}</span>
                                                `).join('')}
                                            </div>
                                        </section>
            
                                        <!-- Education -->
                                        <section>
                                            <h2 style="color: #6c5ce7; font-size: 1.8em; margin-bottom: 1.5em; display: flex; align-items: center; gap: 1em;">
                                                Education
                                                <span style="flex-grow: 1; height: 2px; background: linear-gradient(90deg, #6c5ce7 0%, #a8a4e6 100%);"></span>
                                            </h2>
                                            ${education.map(edu => `
                                                <div style="margin-bottom: 1.5em; padding: 1.5em; background: #f8f9fa; border-radius: 15px; border-left: 4px solid #6c5ce7;">
                                                    <p style="color: #4a4a4a; margin: 0;">${edu}</p>
                                                </div>
                                            `).join('')}
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'minimal':
                    template = `
                    <div style="font-family: 'Roboto', sans-serif; max-width: 8.5in; margin: 0 auto; background: #ffffff;">
                        <div style="display: grid; grid-template-columns: repeat(12, 1fr); min-height: 100vh;">
                            <!-- Header Block -->
                            <div style="grid-column: span 12; background: #2c3e50; color: white; padding: 3em; display: grid; grid-template-columns: 2fr 1fr;">
                                <div>
                                    <h1 style="font-size: 3em; margin: 0; font-weight: 900; letter-spacing: -1px;">${name}</h1>
                                    <div style="margin-top: 1em; max-width: 600px;">
                                        <p style="line-height: 1.8; color: #e0e0e0;">${summary}</p>
                                    </div>
                                </div>
                                <div style="background: #34495e; padding: 2em; border-radius: 10px;">
                                    <div style="display: flex; flex-direction: column; gap: 1em; font-size: 0.9em;">
                                        <span style="display: flex; align-items: center; gap: 0.5em;">
                                            <span style="color: #3498db;">✉</span> ${email}
                                        </span>
                                        <span style="display: flex; align-items: center; gap: 0.5em;">
                                            <span style="color: #3498db;">📱</span> ${phone}
                                        </span>
                                        <span style="display: flex; align-items: center; gap: 0.5em;">
                                            <span style="color: #3498db;">🔗</span> ${linkedin}
                                        </span>
                                        ${github ? `
                                            <span style="display: flex; align-items: center; gap: 0.5em;">
                                                <span style="color: #3498db;">💻</span> ${github}
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
        
                            <!-- Skills Block -->
                            <div style="grid-column: span 4; background: #f8f9fa; padding: 3em;">
                                <h2 style="color: #2c3e50; font-size: 1.5em; margin-bottom: 1.5em; position: relative; display: inline-block;">
                                    Expertise
                                    <span style="position: absolute; bottom: -5px; left: 0; width: 100%; height: 2px; background: #3498db;"></span>
                                </h2>
                                <div style="display: flex; flex-wrap: wrap; gap: 1em;">
                                    ${skills.map(skill => `
                                        <span style="background: white; color: #2c3e50; padding: 0.8em 1.2em; border-radius: 5px; font-size: 0.9em; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>
        
                            <!-- Experience Block -->
                            <div style="grid-column: span 8; padding: 3em;">
                                <h2 style="color: #2c3e50; font-size: 1.5em; margin-bottom: 1.5em; position: relative; display: inline-block;">
                                    Experience
                                    <span style="position: absolute; bottom: -5px; left: 0; width: 100%; height: 2px; background: #3498db;"></span>
                                </h2>
                                ${experience.map(exp => `
                                    <div style="margin-bottom: 2em; padding: 2em; background: #f8f9fa; border-radius: 10px; position: relative; overflow: hidden;">
                                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #3498db;"></div>
                                        <h3 style="color: #2c3e50; font-size: 1.2em; margin-bottom: 0.8em;">${exp.title}</h3>
                                        <p style="color: #666; line-height: 1.6;">${exp.details}</p>
                                    </div>
                                `).join('')}
                            </div>
        
                            <!-- Education Block -->
                            <div style="grid-column: span 12; background: #2c3e50; padding: 3em;">
                                <h2 style="color: white; font-size: 1.5em; margin-bottom: 1.5em;">Education</h2>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2em;">
                                    ${education.map(edu => `
                                        <div style="background: #34495e; padding: 1.5em; border-radius: 8px;">
                                            <p style="color: white; margin: 0;">${edu}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }


        resumeContent.innerHTML = template;
    
        const options = {
            margin: 0.5,
            filename: `${name.replace(/\s+/g, '_')}_${templateStyle}_Resume.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        html2pdf().set(options).from(resumeContent).save();
    }

    profileForm.querySelector("button").addEventListener("click", saveProfile);
    skillForm.querySelector("button").addEventListener("click", addSkill);
    educationForm.querySelector("button").addEventListener("click", addEducation);
    experienceForm.querySelector("button").addEventListener("click", addExperience);
    contactForm.querySelector("button").addEventListener("click", saveContact);
    document.getElementById("resumeOptions").querySelector("button").addEventListener("click", generateResume);
});



