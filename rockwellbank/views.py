from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import  auth
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Portfolio, Transactions
import requests
from .forms import TransactionsForm, UserForm, PortfolioUpdateForm, CreateProfileForm
from django.contrib import messages
from django.db import IntegrityError
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings

# Create your views here.



def home(request):
    return render(request, 'home.html')

def exchange_rates(request):
    endpoint = "https://v6.exchangerate-api.com/v6/9633a5f18ca5b8ccc65aaa80/latest/EUR"
    response = requests.get(endpoint)
    data = response.json()
    rates = data['conversion_rates']

    return render(request, 'exchange_rates.html', {'rates': rates})


def createprofile(request):
    createprofile_form = CreateProfileForm()
    if request.method == 'POST':
            createprofile_form = CreateProfileForm(request.POST, request.FILES)
            if createprofile_form.is_valid():
                try:
                    new_profile = createprofile_form.save(commit=False)
                    new_profile.username = request.user
                    new_profile.save()
                    createprofile_form = CreateProfileForm()
                    return render(request, 'profile.html')
                except IntegrityError:
                    error_message = "A profile already exists for this user."
                return render(request, 'createprofile.html', {'createprofileform': createprofile_form, 'error_message': error_message})


    return render (request, 'createprofile.html', {'createprofileform': createprofile_form})




def profile(request):
    portfolio = None 
    log_user = request.user
    try:
            portfolio = Portfolio.objects.filter(username= log_user)
    except Portfolio.DoesNotExist:
            portfolio = None   
    
    return render(request, 'profile.html', {'portfolio': portfolio})


@login_required(login_url='home')
def portfolio(request):
        log_user = request.user
        portfolio = None       
        try:
            portfolio = Portfolio.objects.filter(username= log_user)
            portfolio_instance = Portfolio.objects.get(username=log_user)
            account_total = portfolio_instance.account_total
            

            amount_to_transfer = Transactions.objects.filter(username = portfolio_instance).order_by('-transaction_date')
        
        except Portfolio.DoesNotExist:
            portfolio = None
            account_total = 0
            amount_to_transfer = None   

        endpoint = "https://v6.exchangerate-api.com/v6/9633a5f18ca5b8ccc65aaa80/latest/EUR"
        response = requests.get(endpoint)
        data = response.json()
        rates = data['conversion_rates'] 

        
        

        return render(request, 'portfolio.html', {'portfolio': portfolio, 'account_total': account_total, 'amount_to_transfer': amount_to_transfer, 'rates': rates })


def updatebalance(request):
    log_user = request.user.id

    portfolio_instance, created = Portfolio.objects.get_or_create(username=log_user)

    if request.method == 'POST':

        update_pin_form = PortfolioUpdateForm(request.POST, instance=portfolio_instance)

        if update_pin_form.is_valid():
            update_pin_form.save()
            messages.success(request, 'Profile updated successfully.')
            return redirect('portfolio')
    else:
        update_pin_form = PortfolioUpdateForm(instance=portfolio_instance)

    return render(request, 'updatebalance.html', {'update_pin_form': update_pin_form})





@login_required(login_url='home')
def transfer(request):
    log_user = request.user.id
    form = TransactionsForm()  

    if request.method == 'POST':
        form = TransactionsForm(request.POST)
        if form.is_valid():
            try:
                pin = int(form.cleaned_data.get('transfer_pin'))
                saved_pin = Portfolio.objects.filter(username=log_user).values()[0]['pin']
                amount_to_transfer = int(form.cleaned_data.get('amount_to_transfer'))
                account_total = Portfolio.objects.filter(username=log_user).values()[0]['account_total']
                if pin == saved_pin and amount_to_transfer <= account_total:
                    transaction = form.save(commit=False)
                    transaction.username = Portfolio.objects.get(username=log_user) 
                    transaction.save()

                    sender_portfolio = Portfolio.objects.get(username=log_user)
                    sender_portfolio.account_total -= amount_to_transfer
                    sender_portfolio.save()

                    messages.success(request, 'Transaction successful!')
                    return redirect('portfolio')
                else:
                    error_message = 'We apologize for the inconvenience, Your recent transaction was unsuccessful due to technical glitches. Please contact customer support at support@rockwelltrustinvestments.com for further assistance.'
                    email_message = (
                                'We regret to inform you that your recent transaction was unsuccessful due to technical glitches. '
                                'We understand the inconvenience this may have caused and sincerely apologize for any inconvenience.\n\n'
                                'For further assistance and resolution, please reply to this email with the following details:\n\n'
                                '1. Account Number:\n'
                                '2. Amount of the Failed Transaction:\n'
                                '4. Any additional information or concerns:\n\n'
                                'Our team is dedicated to resolving this issue promptly and ensuring that your transaction is processed successfully. '
                                'Thank you for your understanding and cooperation.\n\n'
                                    )
                    messages.error(request, error_message)
                    beneficiary_email = form.cleaned_data.get('beneficiary_email')
                    send_mail(
                        subject='Failed Transaction',
                        message=email_message,
                        from_email=settings.EMAIL_HOST_USER,
                        recipient_list=[beneficiary_email],
                        fail_silently=False,
                    )
            except (UnboundLocalError, IndexError, KeyError) as e:
                messages.error(request, 'Error: {}'.format(str(e)))
                pin = None

    return render(request, 'transfer.html', {'form': form})








###############################      LOGIN    #################################

def signin(request):
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']

            user = auth.authenticate(username = username, password= password)

            if user is not None:
                auth.login(request,user)
                return redirect('portfolio')
            else:
                messages.info(request, 'Enter a valid User ID')
                return redirect('signin')
        return render(request, 'signin.html')


def register(request):
    form_name = UserForm()
    if request.method =="POST":
        form_name = UserForm(request.POST)
        if form_name.is_valid():
            form_name.save()
            messages.success(request, "You have registered successfully")
            return redirect('signin')
        else:
            messages.error(request, 'Password not secure') 
            return redirect('register')
    else:
        context = {'form_name':form_name}
        
    return render(request, 'register.html', context )


        

def logout(request):
    auth.logout(request)
    return redirect('signin')

@login_required(login_url='home')
def FAQ(request):
    return render(request, 'help-and-support.html')







