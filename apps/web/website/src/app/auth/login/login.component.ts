import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'quickhost-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  books!: any[];
  loading = true;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: gql`
          {
            books {
              title
              authors {
                name
              }
            }
          }
        `,
      })
      .subscribe(({ data, loading }) => {
        this.books = data && data.books;
        this.loading = loading;
      });
  }
}
