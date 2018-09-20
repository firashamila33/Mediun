// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import newArticleForm from './newArticleForm'
import EditArticleForm from './editArticleForm'

const ArticleWorkspaceIndex = () => (
  <Switch>
    <Route  path='/workspace/myarticle' component={EditArticleForm} />
    <Route  path='/workspace/newarticle' component={newArticleForm}/>
  </Switch>
)

export default ArticleWorkspaceIndex
