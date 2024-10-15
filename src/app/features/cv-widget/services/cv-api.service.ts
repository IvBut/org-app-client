import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const dataMock: any = {
  personalData: {
    name: 'Ivan',
    secondName: 'Butsko',
    photo: null,
    middleName: '',
    noMiddleName: true,
    birtDate: '1994-01-09T22:00:00.000Z',
    gender: 'MALE',
    email: 'ivanbutko5@gmail.com',
    phone: '',
    country: 'Belarus',
    city: 'Grodndo',
    address: '',
    postalCode: '230027'
  },
  sectionSettings: [
    {
      sectionId: 'WORK_EXPERIENCE',
      sectionName: 'Опыт работы',
      hideSection: false
    },
    {
      sectionId: 'EDUCATION',
      sectionName: 'Образование',
      hideSection: false
    },
    {
      sectionId: 'SKILLS',
      sectionName: 'Навыки',
      hideSection: false
    },
    {
      sectionId: 'LANGUAGES',
      sectionName: 'Языки',
      hideSection: false
    },
    {
      sectionId: 'LINKS',
      sectionName: 'Социальные сети',
      hideSection: false
    },
    {
      sectionId: 'PROFILE',
      sectionName: 'Профиль',
      hideSection: false
    }
  ],
  workExperienceList: [
    {
      company: 'intexsoft',
      jobPosition: 'developer',
      location: 'grodno',
      startDate: '2020-07-31T21:00:00.000Z',
      endDate: '2024-10-09T21:00:00.000Z',
      stillWorking: true,
      description: ''
    }
  ],
  educationList: [
    {
      institution: 'GrGY Y. Kypala',
      degree: 'engeener',
      location: 'grodno',
      description: '',
      startYear: '2011-12-31T21:00:00.000Z',
      endYear: '2016-12-31T21:00:00.000Z'
    }
  ],
  skills: [
    {
      type: 'HARD',
      data: []
    },
    {
      type: 'SOFT',
      data: []
    }
  ],
  languages: [],
  links: [],
  profile: {
    summary: ''
  }
};
@Injectable()
export class CvApiService {
  readonly PREFIX: string = '/api';

  private getUrl(path: string) {
    return `${this.PREFIX}${path}`;
  }

  private http = inject(HttpClient);

  createCV(data: FormData) {
    return this.http.post<any>(this.getUrl('/cv'), data);
  }

  previewCV(data: FormData): Observable<any> {
    return this.http.post(this.getUrl('/cv/preview'), data, { responseType: 'text' });
  }
}
